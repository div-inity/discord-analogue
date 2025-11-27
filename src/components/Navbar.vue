<template>
  <TransitionGroup name="fade" class="navbar" tag="div">
    <div class="private-messages" :key="currentBlock">
      <div class="home-link" v-tippy="{ content: t('navbar.mymessages') }">
        <router-link to="/messages" :class="(activeServer > 0) ? null : 'active'" class="home"></router-link>
      </div>

      <div class="h-divider divider"></div>

      <div class="missed_messages" v-for="(m, i) in missed_messages">
        <div class="message" v-tippy="{ content: dialogNames(m.id) }">
          <router-link :class="(m.missed && m.missed > 0) ? 'missed' : null" :to="'/messages/' + m.id"
            class="link-message">
            <img class="avatar radial" :src="m.avatars" v-if="m.avatars && m.avatars.length == 1" alt="">
            <div class="multi-user-avatar" v-else>
              <img class="multi-avatar radial" :src="m.avatars[0]" alt="">
              <img class="multi-avatar radial" :src="m.avatars[1]" alt="">
            </div>
            <div class="mentions radial" v-if="m.missed && m.missed > 0">{{ (m.missed < 1000) ? m.missed : m.missed /
              1000 + 'k+' }}</div>
          </router-link>
        </div>
      </div>
    </div>

    <div :key="currentBlock" class="h-divider divider" v-if="missed_messages && missed_messages.length"></div>

    <div :key="currentBlock" class="servers" v-for="(s, i) in servers">
      <div class="server" v-tippy="{ content: computeServerData(i) }">
        <router-link
          :class="{ 'missed-messages': s.missed_messages && s.missed_messages > 0, 'active': activeServer == s.id }"
          :to="'/server/' + s.id" class="link-server">
          <img :src="s.avatar" alt="">
          <div class="activity radial"
            :class="s.activity_type, { 'my_activity': s.my_activity && s.my_activity == true }" v-if="s.activity_type">
          </div>
          <div class="mentions radial" v-if="s.mentions && s.mentions > 0">{{ (s.mentions < 1000) ? s.mentions :
            s.mentions / 1000 + 'k+' }}</div>
        </router-link>
      </div>
    </div>
    <div :key="currentBlock" class="h-divider divider"></div>

    <div :key="currentBlock" v-tippy="{ content: a.name }" class="actions" v-for="(a, i) in actions">
      <div @click="a.handler" class="link-action">
        <img :src="a.avatar" alt="">
      </div>
    </div>
  </TransitionGroup>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import router from '@/router'
import { useStore } from 'vuex'
import { ref, reactive, computed, watchEffect, h } from 'vue'
import { useRoute } from 'vue-router'

/* Картинки для тултипов */
import call from '@/assets/img/svg/call.svg'
import display from '@/assets/img/svg/display.svg'
import camera from '@/assets/img/svg/camera.svg'

import { generalFunctions } from '@/composables/generalFunctions'
const { dialogNames } = generalFunctions()

const store = useStore()
const servers = store.state.servers.servers
const missed_messages = store.state.private_msg.missed_messages
const activeServer = ref(0) // Начальное значение - сервер не выбран
const currentBlock = ref(1) // Для плавной анимации исчезновения диалога
const actions = reactive([
  {
    id: 1,
    name: t('navbar.addserver'),
    link: '/add-server',
    handler: () => {
      alert("add server")
    },
    avatar: require('@/assets/img/Plus.svg'),
  },
  {
    id: 2,
    name: t('navbar.discovery'),
    link: '/discovery',
    handler: () => {
      router.push({ name: 'discovery' })
    },
    avatar: require('@/assets/img/Discovery.svg'),
  },
])
const route = useRoute()

const computeServerData = (i) => {
  let imgs = [];

  if (servers[i].active_users && servers[i].active_users.length) {
    for (const item of servers[i].active_users) {
      imgs.push(h(
        'img',
        {
          src: item,
          class: 'tooltip-imgs radial',
        }
      ));
    }
  }

  return h(
    'div',
    {
      class: 'flex column navbar-server-tooltip'
    },
    [
      h(
        'div',
        { class: 'server-name' },
        [servers[i].name]
      ),
      (servers[i].activity_type) ? h(
        'div',
        {
          class: 'flex row server-activity',
        },
        (servers[i].activity_type == 'call') ? h(
          'img', {
          src: call,
          class: 'server-activity-type'
        }
        ) :
          (servers[i].activity_type == 'camera') ? h(
            'img', {
            src: camera,
            class: 'server-activity-type'
          }
          ) :
            (servers[i].activity_type == 'display') ? h(
              'img', {
              src: display,
              class: 'server-activity-type'
            }
            ) : null,
        ...imgs,
        (servers[i].active_users && servers[i].active_users.length > 2) ? h(
          'span',
          {
            class: 'server-active-users',
          },
          [
            `+${servers[i].total_active_users - servers[i].active_users.length}`
          ]
        ) : null
      ) : null

    ]
  );
}

const goToMessage = (id) => { // Для перехода в ЛС
  let index = missed_messages.findIndex(e => e.id == id);
  activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  if (index > -1) missed_messages.splice(index, 1) // Удаление из Навбара

}
const goToServer = (id) => {
  activeServer.value = id // Сервер выбран

}
watchEffect(() => {
  //console.log('Полный route объект:', route)
  if (route.name == 'message') goToMessage(route.params.id) // Выбран диалог
  else if (route.name == 'server') goToServer(route.params.id) // Выбран сервер
  else if (route.name == 'messages') {
    activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  }
})
</script>
<style lang="scss">
.navbar-server-tooltip {
  row-gap: 8px;

  .server-name {}

  .server-activity {
    align-items: center;

    .server-activity-type {
      width: 20px;
      margin-right: 7px;
    }

    .server-active-users {
      margin-left: 10px;
      color: var(--muted-text-color);
    }
  }
}

.tooltip-imgs {
  width: 24px;
  aspect-ratio: 1/1;
  background-position: center center;
  margin-right: -5px;
  border: 1px solid var(--icon-color);
}

.navbar {
  background-color: var(--system-back-color5);
  width: 68px;
  height: 100%;
  padding-inline: 10px;
  overflow: auto;
  scrollbar-width: none;

  a {
    &.missed {
      &::before {
        height: 8px;
        left: -10px;
      }
    }

    &.active {
      &::before {
        height: 95.2% !important;
        left: -10px;
      }
    }

    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 0;
      background: #fff;
      border-radius: 0 4px 4px 0;
      top: 50%;
      left: -20px;
      transform: translate(0%, -50%);
      transition: height 0.3s ease, left 0.3s ease;
    }

    &:hover::before {
      height: 19px;
      left: -10px;
    }
  }

  .mentions {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .divider.h-divider {
    margin-block: 8px;
  }

  a.home,
  a.link-server {
    display: flex;
    border-radius: 13px;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .home {
    background-color: var(--system-back-color2);
    background-image: url(@/assets/img/Main-icon.svg);
    background-repeat: no-repeat;
    background-position: center center;

    &:hover,
    &.active {
      background-color: var(--system-purple-color);
    }

  }

  .home-link,
  .message,
  .server,
  .link-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block-end: 8px;
    position: relative;
  }

  .missed_messages {
    .message {
      a.link-message {
        display: flex;
        width: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
        overflow: hidden;

        .avatar {}

        .multi-user-avatar {
          width: 100%;
          position: relative;

          .multi-avatar {
            width: 60%;
            height: 60%;
            position: absolute;
            outline: 3px solid var(--system-back-color5);

            &:first-child {
              z-index: 1;
              left: 0;
              top: 0;
            }

            &:nth-child(2) {
              z-index: 2;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }

  .servers {
    .server {
      a.link-server {
        overflow: hidden;
      }

    }
  }

  .actions {
    position: relative;
    display: flex;
    flex-direction: row;

    .link-action {
      object-fit: cover;
      border-radius: 13px;
      width: 100%;
      aspect-ratio: 1 / 1;
      justify-content: center;
      background-color: var(--system-back-color2);
      border-radius: 30px;

      &:first-of-type {
        cursor: pointer;
      }

      &::before {
        display: none;
      }

      &:hover {
        background-color: var(--system-purple-color);
      }

      img {
        width: auto;
        aspect-ratio: 1 / 1;
        height: auto;
      }
    }
  }
}
</style>