<template>
  <div class="list-friends-wrapper">
    <TextField>
      <template v-slot:prefix>
        <Icon name="search" size="18"/>
      </template>
    </TextField>
    <p class="title-list-friends">
      {{ title }}
    </p>
    <TransitionGroup name="list" tag="div" class="list-friends flex column">
      <div class="list-friends-items flex column" v-for="(item, i) in list" :key="i">
        <Divider h color="var(--system-back-color3)" width="98" />
        <div class="list-friends-item flex row">
          <Avatar :avatar="item.avatar" size="40" :status="item.status"></Avatar>
          <div class="item-info flex column">
            <p class="nickname">{{ item.nickname }}<span class="name">{{ item.name }}</span></p>
            <span>{{ textStatus(item.status) }}</span>
          </div>
          <div class="item-options flex row">
            <button 
              v-html="mainIcons.chat"
              class="radial"
              v-tippy="{ content: 'Сообщение', placement: 'top' }
            "></button>
            <button
              v-html="mainIcons.options"
              class="radial"
              v-tippy="{ content: 'Ещё', placement: 'top' }"
              @click="showPopup(i)"
            ></button>
            <PopUp :key="i" v-show="visiblePopup == i" @mouseleave="hidePopup()">
              <template v-slot:items>
                <a href="#" @click="p.handler" v-for="p in popupItems" :class="p.class">{{ p.name }}</a>
              </template>
            </PopUp>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import { userComposable } from '@/composables/userComposable';

import Avatar from './Avatar.vue';
import Divider from './Divider.vue';
import PopUp from '@/components/PopUp.vue';
import TextField from '@/components/TextField.vue';
import Icon from '@/components/Icon.vue';

import { mainIcons } from '@/assets/icons';

const { textStatus } = userComposable();

const title = inject('title');
const list = inject('list');

const visiblePopup = ref(null);
const popupItems = ref([
  {
    name: 'Начать видеозвонок',
    handler: () => {
      alert('Кнопка 1 нажата!');
    }
  },
  {
    name: 'Начать голосовой звонок',
    handler: () => {
      alert('Кнопка 2 нажата!');
    }
  },
  {
    name: 'Удалить из друзей',
    class: 'red',
    handler: () => {
      alert('Кнопка 3 нажата!');
    }
  },
]);

function showPopup (popup) {
  visiblePopup.value = popup;
};

function hidePopup () {
  visiblePopup.value = null;
};
</script>
<style lang="scss">
// стили для TransitionGroup:
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.list-friends-wrapper {

  .title-list-friends {
    color: var(--main-text-color);
    font-size: 14px;
    padding-block: 15px;
    font-family: var(--font-family-400);
  }

  .list-friends {
    .list-friends-items {

      .list-friends-item {
        padding-block: 10px;
        column-gap: 10px;
        border-radius: 9px;
        padding-inline: 8px;
        cursor: pointer;
        max-height: 61px;
        position: relative;

        &:hover {
          background-color: var(--system-back-color3);

          .item-info .name {
            visibility: visible;
          }
        }

        .item-info {
          flex-grow: 2;
          overflow: hidden;

          .nickname {
            font-family: var(--font-family-500);
            color: var(--main-text-color);
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .name {
            visibility: hidden;
            padding-left: 8px;
          }

          span {
            font-family: var(--font-family-400);
            color: var(--muted-text-color);
            font-size: 14px;
          }
        }

        .item-options {
          column-gap: 10px;

          button {
            background-color: var(--system-back-color2);
            cursor: pointer;
            width: 40px;
            height: 40px;
            color: #ABABAB;

            &:hover {
              svg path {
                fill: var(--loud-text-color)
              }
            }

            svg {
              max-width: 100%;
              max-height: 100%;
              padding: 10px;
            }
          }
        }
      }
    }
  }
}
</style>