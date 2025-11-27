<template>
  <div class="sidebar-wrapper" :style="{ width: sidebarWidth + 'px' }">
    <template v-if="route.meta.private_msg == true">
      <div class="sidebar-header">
        <button class="sidebar-search-dialog text">{{ t('sidebar.sidebarsearchdialog') }}</button>
      </div>
      <menu class="sidebar-actions">
        <ul v-for="a in actions" :to="a.link">
          <li>
            <router-link class="sidebar-actions-link" :to="a.link">
              <div class="menu-icon" v-html="a.avatar"></div>
              {{ a.name }}
            </router-link>
          </li>
        </ul>
      </menu>
      <!--  <div class="divider h-divider sidebar-divider"></div> -->
      <menu class="private-msg">
        <div class="title">
          Личные сообщения
          <button v-html="menuIcons.add" class="dialog-add" v-tippy="{ content: 'Создать ЛС', placement: 'top' }"
            @click="createDialog"></button>
        </div>
        <div class="dialogs flex column">
          <div class="dialog flex row" v-for="(d, i) in dialogs">
            <div class="avatar" v-if="d.avatars.length == 1">
              <img :src="d.avatars[0]" alt="" class="radial">
              <div class="status radial" :class="d.status"></div>
            </div>
            <div class="multi-user-avatar" v-else>
              <img class="multi-avatar" :src="d.avatars[0]" alt="">
              <img class="multi-avatar" :src="d.avatars[1]" alt="">
            </div>
            <div class="flex column dialog-info">
              <div class="names" v-if="d.names.length > 1" v-tippy="{ content: dialogNames(d.id), placement: 'top' }">
                {{ dialogNames(d.id) }}
              </div>
              <div class="names" v-else>{{ dialogNames(d.id) }}</div>
              <div class="members" v-if="d.names.length > 1">
                {{ d.names.length }} {{ memberWord(d.names.length) }}
              </div>
            </div>
            <button class="remove-dialog" v-html="menuIcons.remove" @click="removeDialog"></button>
          </div>
        </div>
      </menu>
    </template>

    sidebar
    <!-- Блок изменения ширины сайдбара -->
    <div class="resize-handle" @mousedown="startResize"></div>

    <!-- Блок юзер-функций (профиль, заглушить, откл.звук, настройки, статус) -->
    <div class="userprofile">

    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useStore } from 'vuex';

import { generalFunctions } from '@/composables/generalFunctions';
const { dialogNames, memberWord } = generalFunctions();

const store = useStore();
const route = useRoute();
const dialogs = store.state.private_msg.dialogs;
const menuIcons = { // Иконки сайдбар-actions
  add: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M43.3334 20C43.3334 19.1159 42.9822 18.2681 42.3571 17.6429C41.732 17.0178 40.8841 16.6666 40.0001 16.6666C39.116 16.6666 38.2682 17.0178 37.6431 17.6429C37.0179 18.2681 36.6667 19.1159 36.6667 20V36.6666H20.0001C19.116 36.6666 18.2682 37.0178 17.6431 37.6429C17.0179 38.2681 16.6667 39.1159 16.6667 40C16.6667 40.884 17.0179 41.7319 17.6431 42.357C18.2682 42.9821 19.116 43.3333 20.0001 43.3333H36.6667V60C36.6667 60.884 37.0179 61.7319 37.6431 62.357C38.2682 62.9821 39.116 63.3333 40.0001 63.3333C40.8841 63.3333 41.732 62.9821 42.3571 62.357C42.9822 61.7319 43.3334 60.884 43.3334 60V43.3333H60.0001C60.8841 43.3333 61.732 42.9821 62.3571 42.357C62.9822 41.7319 63.3334 40.884 63.3334 40C63.3334 39.1159 62.9822 38.2681 62.3571 37.6429C61.732 37.0178 60.8841 36.6666 60.0001 36.6666H43.3334V20Z" fill="#ABABAB"/>
  </svg>
`,
  remove: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M57.6667 62.3334C58.3086 62.8148 59.1026 63.0485 59.903 62.9916C60.7034 62.9348 61.4564 62.5911 62.0237 62.0237C62.5911 61.4563 62.9348 60.7033 62.9916 59.903C63.0485 59.1026 62.8148 58.3086 62.3334 57.6667L44.7334 40L62.4 22.3334C62.9419 21.6919 63.2217 20.8695 63.1835 20.0306C63.1453 19.1918 62.7918 18.3982 62.1939 17.8087C61.5959 17.2191 60.7974 16.877 59.9581 16.8507C59.1188 16.8243 58.3004 17.1158 57.6667 17.6667L40 35.2667L22.3334 17.6C21.6919 17.0581 20.8695 16.7783 20.0306 16.8166C19.1918 16.8548 18.3982 17.2082 17.8087 17.8062C17.2191 18.4042 16.877 19.2026 16.8507 20.042C16.8243 20.8813 17.1158 21.6996 17.6667 22.3334L35.2667 40L17.6 57.6667C17.2534 57.968 16.9728 58.3378 16.7758 58.7527C16.5788 59.1676 16.4696 59.6188 16.4553 60.0779C16.4409 60.5369 16.5215 60.9941 16.6921 61.4205C16.8627 61.847 17.1196 62.2336 17.4467 62.556C17.7738 62.8785 18.164 63.1299 18.5928 63.2944C19.0216 63.459 19.4798 63.5331 19.9387 63.5122C20.3975 63.4913 20.8471 63.3758 21.2592 63.1729C21.6713 62.9701 22.037 62.6842 22.3334 62.3334L40 44.7334L57.6667 62.4V62.3334Z" fill="#ABABAB"/>
  </svg>
`,
  /** Иконки для sidebar-actions: */
  friends: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.77528 2H1C1 10.6232 4.77528 13.744 6.66292 14.0725V19H22C22 12.5942 17.2809 12.5942 13.9775 12.5942C6.66292 12.5942 4.77528 6.43478 4.77528 2Z" fill="#8E9297"/>
    <path d="M13.9775 2.5C19.6405 2.5 19.6405 11.1232 13.9775 11.1232C8.0867 11.1232 8.31461 2.5 13.9775 2.5Z" fill="#8E9297"/>
    </svg>`,
  nitro: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.99062 8.54984C1.99062 8.95728 1.63522 9.29676 1.20867 9.29676H0.782119C0.355571 9.29676 0 8.95728 0 8.54984C0 8.14239 0.355571 7.80291 0.782119 7.80291H1.20867C1.63522 7.80291 1.99062 8.14239 1.99062 8.54984ZM21.2564 8.34612C23.1047 12.0811 21.3985 16.5629 17.3463 18.3285C13.4364 20.0262 8.74435 18.3964 6.967 14.6615C6.6116 13.9146 6.39833 13.0997 6.32718 12.2848H4.76311C4.33657 12.2848 3.98116 11.9451 3.98116 11.5377C3.98116 11.1303 4.33657 10.7908 4.76311 10.7908H7.03815C7.4647 10.7908 7.8201 10.4513 7.8201 10.0439C7.8201 9.63641 7.4647 9.29676 7.03815 9.29676H3.41249C2.98594 9.29676 2.63037 8.95728 2.63037 8.54984C2.63037 8.14239 2.98594 7.80291 3.41249 7.80291H8.45992C8.88647 7.80291 9.24187 7.46327 9.24187 7.05582C9.24187 6.64838 8.88647 6.3089 8.45992 6.3089H6.39833C5.75851 6.3089 5.18966 5.83349 5.18966 5.15453C5.18966 4.54337 5.68736 4 6.39833 4H14.4316C17.2753 4.13592 19.9767 5.69773 21.2564 8.34612ZM12.2719 7.59704C10.024 8.58305 9.03829 11.1231 10.0705 13.2703C11.1028 15.4175 13.7619 16.359 16.0098 15.373C18.2579 14.387 19.2434 11.847 18.2111 9.69977C17.1789 7.55255 14.5198 6.61103 12.2719 7.59704ZM15.8534 9.02519L17.2752 11.3341C17.3464 11.4699 17.3464 11.5378 17.2752 11.6736L15.8534 13.9825C15.7823 14.1182 15.6402 14.1182 15.569 14.1182H12.7965C12.6543 14.1182 12.5832 14.0503 12.5122 13.9825L11.0903 11.6736C11.0193 11.5378 11.0193 11.4699 11.0903 11.3341L12.5122 9.02519C12.5832 8.88943 12.7255 8.88943 12.7965 8.88943H15.569C15.7113 8.82147 15.7823 8.88943 15.8534 9.02519Z" fill="#8E9297"/>
    </svg>`,
  store: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.207 12.9625H16.6173C18.3003 12.9625 19.794 12.1476 20.7292 10.8888L21.1512 18.3558C21.2476 20.0616 19.9502 21.5231 18.2534 21.62C18.1952 21.6233 18.137 21.625 18.0788 21.625H4.07737C2.37778 21.625 1 20.2399 1 18.5312C1 18.4727 1.00165 18.4142 1.00496 18.3558L1.42697 10.8888C2.36217 12.1476 3.85583 12.9625 5.53882 12.9625H5.94913V14.4062H8.00071V12.9625H14.1554V14.4062H16.207V12.9625ZM5.94913 15.4375V17.5H8.00071V15.4375H5.94913ZM14.1554 15.4375H16.207V17.5H14.1554V15.4375ZM14.1554 10.9H8.00071V8.21875H5.94913V10.9H5.53882C3.83923 10.9 2.46145 9.51488 2.46145 7.80625V4.09375C2.46145 2.38512 3.83923 1 5.53882 1H16.6173C18.3169 1 19.6947 2.38512 19.6947 4.09375V7.80625C19.6947 9.51488 18.3169 10.9 16.6173 10.9H16.207V8.21875H14.1554V10.9Z" fill="#8E9297"/>
    </svg>`,
  tasks: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 12C13 13.1 12.1 14 11 14C9.90001 14 9.00001 13.1 9.00001 12C9.00001 10.9 9.90001 9.99998 11 9.99998C12.1 9.99998 13 10.9 13 12ZM7.50001 19V18.5C7.50001 16.8 8.94001 15.5 11 15.5C13.06 15.5 14.5 16.8 14.5 18.5V19H7.50001ZM6.00001 12C6.00001 9.24001 8.24003 6.99998 11 6.99998C13.76 6.99998 16 9.24001 16 12C16 12.91 15.74 13.75 15.31 14.49L16.62 15.25C17.17 14.29 17.5 13.19 17.5 12C17.5 8.41996 14.58 5.49997 11 5.49997C7.41998 5.49997 4.50001 8.41996 4.50001 12C4.50001 13.18 4.82001 14.29 5.38001 15.25L6.69 14.49C6.26003 13.75 6.00001 12.91 6.00001 12Z" fill="#8E9297"/>
    <path d="M11 2.5C5.75001 2.5 1.5 6.75004 1.5 12C1.5 13.73 1.97001 15.35 2.77001 16.7401L1.48001 17.4901C0.550006 15.88 0 14 0 12C0 5.92999 4.93001 1 11 1C17.07 1 22 5.92999 22 12C22 14 21.45 15.88 20.51 17.5L19.22 16.75C20.03 15.35 20.5 13.73 20.5 12C20.5 6.75004 16.25 2.5 11 2.5Z" fill="#8E9297"/>
    </svg>`,
};
const actions = reactive( // Функционал сайдбара
  [
    {
      id: 1,
      name: t('sidebar.friends'),
      link: '/friends',
      handler: () => {
        router.push({ name: 'friends' })
      },
      avatar: menuIcons.friends,
      active: true,
    },
    {
      id: 2,
      name: t('sidebar.nitro'),
      link: '/nitro',
      handler: () => {
        router.push({ name: 'nitro' })
      },
      avatar: menuIcons.nitro,
    },
    {
      id: 3,
      name: t('sidebar.store'),
      link: '/store',
      handler: () => {
        router.push({ name: 'store' })
      },
      avatar: menuIcons.store,
    },
    {
      id: 4,
      name: t('sidebar.tasks'),
      link: '/tasks',
      handler: () => {
        router.push({ name: 'tasks' })
      },
      avatar: menuIcons.tasks,
    },
  ]);
const removeDialog = () => {
  alert("Closed")
};
const createDialog = () => {
  alert("Created")
};


/** Блок кода для изменения ширины сайдбара */
const sidebarWidth = ref(240); // начальная ширина
const minWidth = 190; // минимальная ширина
const maxWidth = 360; // максимальная ширина

const isResizing = ref(false);
const startX = ref(0);
const startWidth = ref(0);

const startResize = (event) => {
  isResizing.value = true;
  startX.value = event.clientX;
  startWidth.value = sidebarWidth.value;

  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
};

const resize = (event) => {
  if (!isResizing.value) return;
  const deltaX = event.clientX - startX.value;
  let newWidth = startWidth.value + deltaX;

  // Ограничение по минимальной и максимальной ширине
  newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

  sidebarWidth.value = newWidth;
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
};

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
});
/** Конец блока кода для изменения ширины сайдбара */
</script>
<style lang="scss">
.sidebar-wrapper {
  height: 100%;
  width: 240px;
  background-color: var(--system-back-color3);
  border-radius: 7px 0 0 0;
  position: relative;

  * {
    user-select: none;
  }

  .sidebar-header {
    height: 50px;
    width: 100%;
    padding: 10px;
    /* box-shadow: 0px 1px 2px #232527; */
    border-bottom: 1px solid var(--system-back-color5);

    .sidebar-search-dialog {
      height: 100%;
      width: 100%;
      color: var(--icon-color);
      background-color: var(--system-back-color5);

      &:hover {
        color: var(--muted-text-color);
      }
    }
  }

  .sidebar-actions {
    padding: 10px;
    /* box-shadow: inset 0px -1px 2px #232527; */

    .sidebar-actions-link {
      color: var(--muted-text-color);
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      column-gap: 8px;
      font-family: var(--font-family-500);
      font-size: 15px;
      width: 100%;
      border-radius: 3px;
      padding: 8px;

      &:hover {
        background-color: var(--system-back-color2);
        color: var(--main-text-color);

        svg * {
          fill: var(--main-text-color);
        }
      }

      .menu-icon {
        height: 20px;
        width: auto;

        svg {
          height: inherit;
          width: inherit;
        }
      }
    }
  }

  .private-msg {
    display: flex;
    flex-direction: column;
    padding: 8px;
    font-family: var(--font-family-500);
    color: var(--muted-text-color);

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 12px;
      line-height: 109%;
      letter-spacing: 0.02em;
      justify-content: space-between;
      padding-inline: 5px;
      text-transform: uppercase;

      &:hover {
        color: var(--main-text-color);
      }

      .dialog-add {
        background: transparent;
        width: 20px;
        aspect-ratio: 1 / 1;
        cursor: pointer;

        &:hover svg * {
          fill: var(--main-text-color);
        }

        svg {
          height: 100%;
          width: 100%;
        }
      }
    }

    .dialogs {
      row-gap: 5px;
      margin-top: 9px;

      .dialog {
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
        align-items: center;
        column-gap: 12px;
        position: relative;

        .status {
          background-color: var(--system-back-color3);
          outline: 2px solid var(--system-back-color3);
          height: 10px;
        }

        &:hover {
          background-color: var(--system-back-color2);
          color: var(--main-text-color);

          .dialog-info {
            max-width: calc(70% - 10px);
          }

          .remove-dialog {
            visibility: visible;
          }
        }

        img {
          aspect-ratio: 1/1;
          background-position: center center;
        }

        .avatar {
          height: 32px;
          position: relative;

          img {
            height: inherit;
          }
        }

        .multi-user-avatar {
          aspect-ratio: 1/1;
          height: 32px;
          position: relative;

          .multi-avatar {
            width: 60%;
            height: 60%;
            border-radius: 30px;
            position: absolute;
            outline: 3px solid var(--system-back-color3);

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

        .dialog-info {
          overflow: hidden;
          flex-grow: 2;

          .names {
            font-size: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .members {
            font-size: 12px;
          }
        }

        .remove-dialog {
          background: transparent;
          width: 16px;
          aspect-ratio: 1 / 1;
          cursor: pointer;
          visibility: hidden;
          position: absolute;
          right: 5px;

          &:hover svg * {
            fill: var(--main-text-color);
          }

          svg {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

  .resize-handle {
    width: 1px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    height: 100%;
    cursor: ew-resize;
    background-color: transparent;
    transition: .5s width ease;

    &:hover {
      width: 3px;
      background-color: var(--system-back-color4);
    }
  }
}
</style>