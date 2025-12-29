<template>
  <div class="list-friends-wrapper">
    <p class="title-list-friends">
      <slot name="title">Название списка друзей</slot>
    </p>
    <TransitionGroup name="list" tag="div" class="list-friends flex column">
      <div class="list-friends-items flex column" v-for="(item, i) in props.list" :key="item">

        <Divider h color="var(--system-back-color3)" :width="98" />
        <div class="list-friends-item flex row">
          <Avatar :avatar="item.avatar" :size="40" :status="item.status"></Avatar>
          <div class="item-info flex column">
            <p>{{ item.name }}</p>
            <span>{{ textStatus(item.status) }}</span>
          </div>
          <div class="item-options flex row">
            <button v-html="icons.chat" class="radial" v-tippy="{ content: 'Сообщение', placement: 'top' }"></button>
            <button v-html="icons.options" class="radial" v-tippy="{ content: 'Ещё', placement: 'top' }"
              @click="showPopup(i)"></button>
            <PopUp :key="i" v-show="visiblePopup == i">
              <template v-slot:items>
                <a href="#" @click="handleButtonClick1" class="item">Начать видеозвонок</a>
                <a href="#" @click="handleButtonClick2" class="item">Начать голосовой звонок</a>
                <a href="#" @click="handleButtonClick3" class="item">Удалить из друзей</a>
              </template>
            </PopUp>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Avatar from './Avatar.vue';
import Divider from './Divider.vue';
import { generalFunctions } from '@/composables/generalFunctions';
import PopUp from '@/components/PopUp.vue';
const { textStatus } = generalFunctions();
const props = defineProps({
  list: {
    type: Object,
    required: true,
  }
});

const icons = {
  chat: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.9999 73.3333C47.3967 73.3276 54.5814 70.8617 60.4228 66.324C66.2642 61.7863 70.4303 55.4346 72.2653 48.2691C74.1002 41.1035 73.4996 33.5312 70.5582 26.7444C67.6168 19.9577 62.5015 14.3421 56.0179 10.7819C49.5343 7.22165 42.0507 5.91908 34.7455 7.07926C27.4403 8.23945 20.7285 11.7965 15.667 17.1903C10.6054 22.584 7.48167 29.5081 6.78761 36.8723C6.09355 44.2364 7.86861 51.6222 11.8333 57.8667C12.2666 58.5 12.1999 59.3333 11.6999 59.9L4.83327 67.8C4.41048 68.2813 4.13532 68.8741 4.04071 69.5077C3.9461 70.1413 4.03605 70.7887 4.29981 71.3725C4.56356 71.9562 4.98994 72.4516 5.52791 72.7994C6.06589 73.1471 6.69268 73.3325 7.33327 73.3333H39.9999Z" fill="#ABABAB"/>
</svg>
`,
  options: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.3335 13.3333C33.3335 15.1014 34.0359 16.7971 35.2861 18.0473C36.5364 19.2976 38.2321 20 40.0002 20C41.7683 20 43.464 19.2976 44.7142 18.0473C45.9644 16.7971 46.6668 15.1014 46.6668 13.3333C46.6668 11.5652 45.9644 9.86949 44.7142 8.61925C43.464 7.369 41.7683 6.66663 40.0002 6.66663C38.2321 6.66663 36.5364 7.369 35.2861 8.61925C34.0359 9.86949 33.3335 11.5652 33.3335 13.3333ZM40.0002 46.6666C38.2321 46.6666 36.5364 45.9642 35.2861 44.714C34.0359 43.4638 33.3335 41.7681 33.3335 40C33.3335 38.2318 34.0359 36.5362 35.2861 35.2859C36.5364 34.0357 38.2321 33.3333 40.0002 33.3333C41.7683 33.3333 43.464 34.0357 44.7142 35.2859C45.9644 36.5362 46.6668 38.2318 46.6668 40C46.6668 41.7681 45.9644 43.4638 44.7142 44.714C43.464 45.9642 41.7683 46.6666 40.0002 46.6666ZM40.0002 73.3333C38.2321 73.3333 36.5364 72.6309 35.2861 71.3807C34.0359 70.1304 33.3335 68.4347 33.3335 66.6666C33.3335 64.8985 34.0359 63.2028 35.2861 61.9526C36.5364 60.7023 38.2321 60 40.0002 60C41.7683 60 43.464 60.7023 44.7142 61.9526C45.9644 63.2028 46.6668 64.8985 46.6668 66.6666C46.6668 68.4347 45.9644 70.1304 44.7142 71.3807C43.464 72.6309 41.7683 73.3333 40.0002 73.3333Z" fill="#ABABAB"/>
</svg>
`,
};
const visiblePopup = ref(null);
const showPopup = (popup) => {
  visiblePopup.value = popup;
}
const handleButtonClick1 = () => {
  alert('Кнопка 1 нажата!');
};
const handleButtonClick2 = () => {
  alert('Кнопка 2 нажата!');
};
const handleButtonClick3 = () => {
  alert('Кнопка 3 нажата!');
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
        }

        .item-info {
          flex-grow: 2;
          overflow: hidden;

          p {
            font-family: var(--font-family-500);
            color: var(--main-text-color);
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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