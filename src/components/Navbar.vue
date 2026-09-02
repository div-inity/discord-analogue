<template>
  <TransitionGroup name="fade" class="navbar" tag="div" :style="{ width: navbarWidth + 'px' }">
    <!-- Добавлен явный ключ для корневого элемента -->
    <template v-if="user" :key="'user-block'">
      
      <!-- Блок личных сообщений -->
      <div class="private-messages" :key="'private-messages'">
        <div class="home-link" v-tippy="{ content: t('navbar.mymessages') }">
          <router-link 
            :to="(activeDialogID == null) ? '/friends' : '/messages/'+activeDialogID" 
            :class="(activeServer > 0) ? null : 'active'" 
            class="home"
          >
            <Avatar size="48" square />
          </router-link>
        </div>
      </div>

      <!-- Разделитель -->
      <Divider 
        v-if="unreadDialogs?.length" 
        :key="'divider-1'" 
        :width="67" 
        color="var(--system-back-color1)" 
        h 
      />

      <!-- Непрочитанные диалоги -->
      <div 
        v-for="(d, i) in unreadDialogs" 
        :key="'dialog-' + d.uuid"  
        class="missed_messages"
      >
        <div class="message" v-tippy="{ content: d.custom_name || dialogNames(d.members_info) }">
          <router-link 
            :class="(d?.unread_count > 0) ? 'missed' : null" 
            :to="'/messages/' + d.uuid"
            class="link-message"
          >
            <Avatar 
              v-if="d.avatars?.length == 1" 
              size="48" 
              :mentions="d.unread_count" 
              :avatar="d.avatars[0]" 
            />
            <Avatar 
              v-else 
              size="48" 
              :mentions="d.unread_count" 
              :avatars="d.avatars" 
              multy
              outline="var(--system-back-color5)" 
            />
          </router-link>
        </div>
      </div>

      <!-- Второй разделитель -->
      <Divider 
        v-if="unreadDialogs?.length" 
        :key="'divider-2'" 
        :width="67" 
        color="var(--system-back-color1)" 
        h 
      />

      <!-- Серверы -->
      <div 
        v-for="(s, i) in servers" 
        :key="'server-' + s.id" 
        class="servers"
      >
        <div class="server" v-tippy="{ content: computeServerData(i) }">
          <router-link
            :class="{ 
              'missed-messages': s.missed_messages && s.missed_messages > 0, 
              'active': activeServer == s.id 
            }"
            :to="'/server/' + s.id" 
            class="link-server"
          >
            <Avatar 
              :avatar="s.avatar" 
              square 
              size="48" 
              :mentions="s.mentions" 
              :activity="s.activity_type"
              :active="s.my_activity" 
            />
          </router-link>
        </div>
      </div>

      <!-- Третий разделитель -->
      <Divider 
        v-if="servers?.length" 
        :key="'divider-3'" 
        :width="67" 
        color="var(--system-back-color1)" 
        h 
      />

      <!-- Действия -->
      <div 
        v-for="(a, i) in actions" 
        :key="'action-' + a.id"  
        v-tippy="{ content: a.name }" 
        class="actions"
      >
        <div @click="a.handler" class="link-action">
          <img :src="a.avatar" alt="">
        </div>
      </div>

      <!-- Блок юзер-функций -->
      <div 
        :key="'userprofile'" 
        class="userprofile flex row" 
        :style="{ width: profileWidth + 'px' }"
      >
        <div class="profile flex row">
          <Avatar size="35" :avatar="user.avatar" :status="user.status" />
          <div class="userinfo flex column">
            <div class="name">{{ user.name }}</div>
            <div class="userprofile-info">{{ user.info ?? user.status ?? "Без статуса" }}</div>
            <div class="nickname">{{ user.nickname }}</div>
          </div>
        </div>

        <div class="user-actions flex row">
          <button 
            @click="microphoneToggle" 
            v-html="profileIcons.microphone"
            v-tippy="{ content: 'Заглушить', placement: 'top' }"
            :key="'mic-btn'"
          ></button>
          <button 
            @click="headphonesToggle" 
            v-html="profileIcons.headphones"
            v-tippy="{ content: 'Откл. звук', placement: 'top' }"
            :key="'headphones-btn'"
          ></button>
          <button 
            @click="settingsOpen" 
            v-html="profileIcons.settings"
            v-tippy="{ content: 'Настройки пользователя', placement: 'top' }"
            :key="'settings-btn'"
          ></button>
        </div>
      </div>

      <!-- Кнопка выхода -->
      <button 
        @click="logout()" 
        :key="'logout-btn'"
      >
        Выход
      </button>

    </template>
  </TransitionGroup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import router from '@/router';
import { useStore } from 'vuex';
import { ref, watchEffect, h } from 'vue';
import { useRoute } from 'vue-router';

// Компоненты
import Avatar from './Avatar.vue';
import Divider from './Divider.vue';
import ImgQueue from './ImgQueue.vue';

// Иконки
import Icon from '@/components/Icon.vue';
import { profileIcons } from '@/assets/icons';

// Композаблы
import { generalFunctions, profileWidth } from '@/composables/generalFunctions';
import { logout, user } from '@/composables/userComposable';
import { dialogNames, activeDialogID, unreadDialogs } from '@/composables/dialogComposable';

const { t } = useI18n();
const store = useStore();
const route = useRoute();

const { navbarWidth } = generalFunctions();

const currentBlock = ref(1); // Для плавного проявления в TransitionGroup
const servers = store.state.servers.servers;
const missed_messages = store.state.private_msg.missed_messages;
const activeServer = ref(0); // Начальное значение - сервер не выбран
const actions = ref([
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
]);


function computeServerData (i) {
  let imgs = [];

  if (servers[i].active_users && servers[i].active_users.length) {
    for (const item of servers[i].active_users) {
      imgs.push(item); // Загружаем аватары активных игроков на сервере
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
          Icon, {
          class: 'server-activity-type',
          name: 'call',
        }
        ) :
          (servers[i].activity_type == 'camera') ? h(
            Icon, {
            name: 'camera',
            class: 'server-activity-type'
          }
          ) :
            (servers[i].activity_type == 'display') ? h(
              Icon, {
              name: 'display',
              class: 'server-activity-type'
            }
            ) : null,
        h(
          ImgQueue,
          {
            imgs: imgs,
          }
        ),
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
};

function goToMessage (id) { // Для перехода в ЛС
  let index = missed_messages.findIndex(e => e.id == id);
  activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  if (index > -1) missed_messages.splice(index, 1) // Удаление из Навбара
};

function goToServer (id) {
  activeServer.value = id // Сервер выбран
};

function microphoneToggle () {

};

function headphonesToggle () {

};

function settingsOpen () {

};

watchEffect(() => {
  if (route.name == 'message') goToMessage(route.params.id) // Выбран диалог
  else if (route.name == 'server') goToServer(route.params.id) // Выбран сервер
  else if (route.name == 'messages') {
    activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  }
});

</script>
<style lang="scss">
.navbar-server-tooltip {
  row-gap: 8px;

  .server-activity {
    align-items: center;

    .server-activity-type {
      width: 20px;
      height: 20px;
      margin-right: 7px;
      color: #ABABAB;
      display: block;
      * {
        height: inherit;
        width: inherit;
      }
    }

    .server-active-users {
      margin-left: 10px;
      color: var(--muted-text-color);
    }
  }
}

.navbar {
  padding-bottom: 80px;
  background-color: var(--system-back-color5);
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
      background: var(--loud-text-color);
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

  .home-link {
    .avatar {
      img {
        background-color: var(--system-back-color2);
      }
    }
    &:hover {
      .avatar img{
        background-color: var(--system-purple-color);
      }
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

  .userprofile {
    padding: 5px;
    border: 1px solid var(--system-back-color2);
    background: var(--system-back-color4);
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 11;
    min-width: 0;
    border-radius: 8px;
    justify-content: space-between;

    &:hover {
      .userprofile-info {
        max-height: 0 !important;
      }

      .nickname {
        max-height: 17px !important;
      }
    }

    .profile {
      overflow: hidden;
      padding: 5px;
      flex-grow: 2;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: var(--system-back-color2);
      }

      .avatar {
        margin-right: 8px;
      }

      .userinfo {
        overflow: hidden;
        justify-content: center;

        .name {
          font-family: var(--font-family-400);
          font-weight: 500;
          font-size: 14px;
          color: var(--main-text-color);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .userprofile-info,
        .nickname {
          font-family: var(--font-family-400);
          font-size: 12px;
          color: var(--muted-text-color);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 17px;
        }

        .nickname {
          max-height: 0;
        }
      }
    }

    .user-actions {
      align-self: center;
      column-gap: 11px;
      margin-right: 5px;

      button {
        aspect-ratio: 1/1;
        background-color: transparent;
        height: 29px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;

        &:hover {
          background-color: var(--system-back-color1);

          &:nth-child(1) svg {

            // Микрофон
            path:nth-child(1),
            path:nth-child(3),
            path:nth-child(4) {
              fill: #fff;
            }

            path:nth-child(2) {
              stroke: #fff;
            }
          }

          &:nth-child(2) svg,
          &:nth-child(3) svg {

            // Наушники и настройки
            path {
              fill: #fff;
            }
          }

        }

        svg {
          height: 19px;
          width: auto;
        }
      }
    }
  }
}
</style>
