<template>
  <TransitionGroup name="fade" class="navbar" tag="div" :style="{ width: navbarWidth + 'px' }">
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

    <!-- Блок юзер-функций (профиль, заглушить, откл.звук, настройки, статус) -->
    <div :key="currentBlock" class="userprofile flex row" :style="{ width: profileWidth + 'px' }">
      <div class="profile flex row">
        <div class="avatar radial">
          <img v-if="user.avatar" :src="user.avatar" alt="" class="user-custom-avatar">
          <img v-else src="@/assets/img/svg/logo.svg" alt="" class="user-logo">
          <div class="status radial" :class="user.status"></div>
        </div>
        <div class="userinfo flex column">
          <div class="name">{{ user.name }}</div>
          <div class="userprofile-info">{{ (user.info) ? user.info : user.status }}</div>
          <div class="nikname">{{ user.nikname }}</div>
        </div>
      </div>

      <div class="user-actions flex row">
        <button @click="microphoneToggle" v-html="profileIcons.microphone"
          v-tippy="{ content: 'Заглушить', placement: 'top' }">
        </button>
        <button @click="headphonesToggle" v-html="profileIcons.headphones"
          v-tippy="{ content: 'Откл. звук', placement: 'top' }">
        </button>
        <button @click="settingsOpen" v-html="profileIcons.settings"
          v-tippy="{ content: 'Настройки пользователя', placement: 'top' }">
        </button>
      </div>
    </div>
  </TransitionGroup>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import router from '@/router'
import { useStore } from 'vuex'
import { ref, reactive, watchEffect, h } from 'vue'
import { useRoute } from 'vue-router'

/* Картинки для тултипов */
import call from '@/assets/img/svg/call.svg'
import display from '@/assets/img/svg/display.svg'
import camera from '@/assets/img/svg/camera.svg'

import { generalFunctions } from '@/composables/generalFunctions'
const { dialogNames, navbarWidth, profileWidth } = generalFunctions()

const store = useStore()
const user = store.state.user.user;
const servers = store.state.servers.servers;
const missed_messages = store.state.private_msg.missed_messages;
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
});

const profileIcons = {
  microphone: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_3_2135" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-27" y="-27" width="134" height="134">
    <path d="M-26.6667 -26.6667H106.667V106.667H-26.6667V-26.6667Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_3_2135)">
    <mask id="mask1_3_2135" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-45" width="131" height="125">
    <path d="M80 0H0V80H80V0Z" fill="white"/>
    <path d="M110.029 -38.2939L87.1596 -14.9667C87.1596 -14.9667 78.6347 -5.96907 85.2183 0.648262C92.4 7.86666 101.024 -1.19254 101.024 -1.19254L123.894 -24.5197C123.894 -24.5197 134.933 -35.4667 128.029 -42.0739C121.171 -48.6363 110.029 -38.2939 110.029 -38.2939Z" fill="black"/>
    <path d="M66.4 27.3333H58.9333V37.2H66.4V27.3333Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_3_2135)">
    <path d="M53.3334 19.8667C53.3334 12.5033 47.3634 6.53333 40 6.53333C32.6367 6.53333 26.6667 12.5033 26.6667 19.8667V33.0667C26.6667 40.43 32.6367 46.4 40 46.4C47.3634 46.4 53.3334 40.43 53.3334 33.0667V19.8667Z" fill="#ABABAB"/>
    <path d="M63.3334 33.0667C63.3334 45.9533 52.8867 56.4 40 56.4C27.1134 56.4 16.6667 45.9533 16.6667 33.0667" stroke="#ABABAB" stroke-width="4" stroke-linecap="round"/>
    <path d="M43.3334 56.4C43.3334 55.48 42.5867 54.7333 41.6667 54.7333H38.3334C37.4134 54.7333 36.6667 55.48 36.6667 56.4V69.7333C36.6667 70.6533 37.4134 71.4 38.3334 71.4H41.6667C42.5867 71.4 43.3334 70.6533 43.3334 69.7333V56.4Z" fill="#ABABAB"/>
    <path d="M30 66.4C28.16 66.4 26.6667 67.8933 26.6667 69.7333C26.6667 71.5733 28.16 73.0667 30 73.0667H50C51.84 73.0667 53.3334 71.5733 53.3334 69.7333C53.3334 67.8933 51.84 66.4 50 66.4H30Z" fill="#ABABAB"/>
    </g>
    </g>
    </svg>`,
  headphones: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_3_2271" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-30" y="-30" width="140" height="140">
    <path d="M-29.3333 -29.3333H109.333V109.333H-29.3333V-29.3333Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_3_2271)">
    <path d="M12.2666 40C12.2666 24.6842 24.6842 12.2666 40 12.2666C55.3157 12.2666 67.7333 24.6842 67.7333 40C67.7333 42.4024 67.5738 44.7146 67.2272 46.9333H60.8C57.5274 46.9333 54.4456 48.476 52.48 51.0933L45.6402 60.2106C44.0144 62.3808 43.5914 65.2234 44.5205 67.7714C46.5485 73.3493 53.4749 76.6634 59.0042 72.656C70.6418 64.2285 74.6666 52.7157 74.6666 40C74.6666 20.8536 59.1464 5.33331 40 5.33331C20.8536 5.33331 5.33331 20.8536 5.33331 40C5.33331 52.7157 9.35811 64.2285 20.9957 72.656C26.525 76.6634 33.4514 73.3493 35.4794 67.7714C36.4085 65.2234 35.9856 62.3808 34.3597 60.2106L27.52 51.0933C25.5544 48.476 22.4725 46.9333 19.2 46.9333H12.7728C12.4261 44.7146 12.2666 42.4024 12.2666 40Z" fill="#ABABAB"/>
    </g>
    </svg>`,
  settings: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_3_2395" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
    <path d="M0 0H80V80H0V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_3_2395)">
    <path d="M35.1933 3.64668C33.6833 3.84334 32.8433 5.41668 33.0733 6.92334C33.6666 10.81 32.45 14.2633 29.7966 15.3633C27.1433 16.4633 23.84 14.8833 21.5133 11.7167C20.61 10.49 18.9 9.97001 17.6933 10.8967C15.14 12.8567 12.8566 15.14 10.8966 17.6933C9.96998 18.9 10.49 20.61 11.7166 21.5133C14.8833 23.84 16.4633 27.1433 15.3633 29.7967C14.2633 32.45 10.81 33.6667 6.92331 33.0733C5.41665 32.8433 3.84331 33.6833 3.64665 35.1933C3.43998 36.7667 3.33331 38.37 3.33331 40C3.33331 41.63 3.43998 43.2333 3.64665 44.8067C3.84331 46.3167 5.41665 47.1567 6.92331 46.9267C10.81 46.3333 14.2633 47.55 15.3633 50.2033C16.4633 52.8567 14.8833 56.1567 11.7166 58.4867C10.49 59.39 9.96998 61.0967 10.8966 62.3067C12.8566 64.86 15.14 67.1433 17.6933 69.1033C18.9 70.03 20.61 69.51 21.5133 68.2833C23.84 65.1167 27.1433 63.5367 29.7966 64.6367C32.45 65.7367 33.6666 69.19 33.0733 73.0767C32.8433 74.5833 33.6833 76.1567 35.1933 76.3533C36.7666 76.56 38.37 76.6667 40 76.6667C41.63 76.6667 43.2333 76.56 44.8066 76.3533C46.3167 76.1567 47.1567 74.5833 46.9266 73.0767C46.3333 69.19 47.5533 65.7367 50.2066 64.6367C52.86 63.5367 56.16 65.1167 58.4866 68.2833C59.39 69.51 61.0966 70.03 62.3066 69.1033C64.86 67.1433 67.1433 64.86 69.1033 62.3067C70.03 61.0967 69.51 59.39 68.2833 58.4867C65.1167 56.16 63.5366 52.8567 64.6366 50.2033C65.7366 47.55 69.19 46.3333 73.0767 46.9267C74.5833 47.1567 76.1566 46.3167 76.3533 44.8067C76.56 43.2333 76.6666 41.63 76.6666 40C76.6666 38.37 76.56 36.7667 76.3533 35.1933C76.1566 33.6833 74.5833 32.8433 73.0767 33.0733C69.19 33.6667 65.7366 32.45 64.6366 29.7967C63.5366 27.1433 65.1167 23.84 68.2833 21.5133C69.51 20.61 70.03 18.9 69.1033 17.6933C67.1433 15.14 64.86 12.8567 62.3066 10.8967C61.0966 9.97001 59.3933 10.49 58.49 11.7167C56.1633 14.8833 52.86 16.4633 50.2066 15.3633C47.5533 14.2633 46.3367 10.81 46.93 6.92334C47.16 5.41668 46.3167 3.84334 44.8066 3.64668C43.2333 3.44001 41.63 3.33334 40 3.33334C38.37 3.33334 36.7666 3.44001 35.1933 3.64668ZM53.3333 40C53.3333 47.3633 47.3633 53.3333 40 53.3333C32.6366 53.3333 26.6666 47.3633 26.6666 40C26.6666 32.6367 32.6366 26.6667 40 26.6667C47.3633 26.6667 53.3333 32.6367 53.3333 40Z" fill="#ABABAB"/>
    </g>
    </svg>`,
};

const microphoneToggle = () => {

};
const headphonesToggle = () => {

};
const settingsOpen = () => {

};
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
  /* width: 68px; */
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

  .userprofile {
    /* height: 56px; */
    padding: 8px;
    border: 1px solid var(--system-back-color2);
    background: var(--system-back-color4);
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 10;
    min-width: 0;
    border-radius: 8px;
    justify-content: space-between;

    &:hover {
      .userprofile-info {
        max-height: 0 !important;
      }

      .nikname {
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
        width: 40px;
        aspect-ratio: 1/1;
        outline: 1px solid grey;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-right: 8px;
        min-width: 40px;


        img {
          background-position: center center;

          &.user-custom-avatar {}

          &.user-logo {
            height: 21.22px;
            width: 28px;
          }
        }

        .status {}
      }

      .userinfo {
        overflow: hidden;

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
        .nikname {
          font-family: var(--font-family-400);
          font-size: 12px;
          color: var(--muted-text-color);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 17px;
        }

        .nikname {
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
        cursor: pointer;
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