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
      <menu class="private-msg">
        <div class="title">
          Личные сообщения
          <button v-html="sidebarIcons.add" class="dialog-add" v-tippy="{ content: 'Создать ЛС', placement: 'top' }"
            @click="createDialog"></button>
        </div>
        
        <template v-if="dialogs && dialogs.length">
          <div class="dialogs flex column">
            <div class="dialog flex row" v-for="(d, i) in dialogs" :key="i">
              
            <Avatar v-if="d.avatars?.length == 1" size="32" :status="d.status" :avatar="d.avatars[0]" />
            <Avatar v-else size="32" :status="d.status" :avatars="d.avatars" multy
              outline="var(--system-back-color3)" />
              
              <div class="flex column dialog-info">
                <div 
                  class="names" 
                  v-if="d.members.length > 1" 
                  v-tippy="{ content: dialogNames(d), placement: 'top' }"
                >
                  {{ (d.custom_name) ? d.custom_name : dialogNames(d) }} <!-- Несколько имен или название чата -->
                </div>
                <div class="names" v-else>{{ dialogNames(d) }}</div><!--  Одно имя  -->
                
                <div class="members" v-if="d.members.length > 1">
                  {{d.members.length}} {{ memberWord(d.members.length) }} <!--  Кол-во участников -->
                </div>
              </div>
              <!-- <Mentions>{{ d.unread_count }}</Mentions> -->
              <button 
                class="remove-dialog" 
                v-html="sidebarIcons.remove" 
                @click="removeDialog(d?.uuid)"
              ></button>
            </div>
          </div>
        </template>
      </menu>
    </template>

    sidebar {{ sidebarWidth }}
    <!-- Блок изменения ширины сайдбара -->
    <div class="resize-handle" @mousedown="startResize"></div>


  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { reactive, ref, onBeforeUnmount, computed} from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import Avatar from './Avatar.vue';
/* import Mentions from './Mentions.vue'; */

import { generalFunctions } from '@/composables/generalFunctions';
const {  sidebarWidth, updateSidebarWidth} = generalFunctions();
import { dialogComposable } from '@/composables/dialogComposable'
const {dialogNames, memberWord, dialogs} = dialogComposable()


import { sidebarIcons } from '@/assets/icons'

const route = useRoute();
//console.log(dialogs.value, 'Sidebar')



const actions = reactive( // Функционал сайдбара
  [
    {
      id: 1,
      name: t('sidebar.friends'),
      link: '/friends',
      handler: () => {
        router.push({ name: 'friends' })
      },
      avatar: sidebarIcons.friends,
      active: true,
    },
    {
      id: 2,
      name: t('sidebar.nitro'),
      link: '/nitro',
      handler: () => {
        router.push({ name: 'nitro' })
      },
      avatar: sidebarIcons.nitro,
    },
    {
      id: 3,
      name: t('sidebar.store'),
      link: '/store',
      handler: () => {
        router.push({ name: 'store' })
      },
      avatar: sidebarIcons.store,
    },
    {
      id: 4,
      name: t('sidebar.tasks'),
      link: '/tasks',
      handler: () => {
        router.push({ name: 'tasks' })
      },
      avatar: sidebarIcons.tasks,
    },
  ]);
const removeDialog = () => {
  alert("Closed")
};
const createDialog = () => {
  alert("Created")
};



/** Блок кода для изменения ширины сайдбара */
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
  updateSidebarWidth(newWidth);
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
/** Конец Блока кода для изменения ширины сайдбара */

</script>
<style lang="scss">
.sidebar-wrapper {
  height: 100%;
  width: 240px;
  background-color: var(--system-back-color3);
  border-radius: 7px 0 0 0;
  position: relative;
  overflow: auto;
  scrollbar-width: none;

  * {
    user-select: none;
  }

  .sidebar-header {
    height: 50px;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid var(--system-back-color5);

    .sidebar-search-dialog {
      height: 100%;
      width: 100%;
      color: var(--icon-color);
      background-color: var(--system-back-color5);
      text-align: left;
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        color: var(--muted-text-color);
      }
    }
  }

  .sidebar-actions {
    padding: 10px;

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
      transition: 0.3s background-color, color;

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
        transition: 0.3s all;
        /* * {
          transition: 0.3s all;
        } */

        &:hover {
          background-color: var(--system-back-color2);
          color: var(--main-text-color);

          /* .mentions {
            transform: translateX(-10%);
          } */

          .dialog-info {
            max-width: calc(70% - 10px);
          }

          .remove-dialog {
            visibility: visible;
            transform: translateX(-10%);
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
          height: 16px;
          cursor: pointer;
          visibility: hidden;
          position: absolute;
          right: 7px;

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