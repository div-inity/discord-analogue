<template v-if="user">
  <div class="profile__head">
    <div class="profile__actions flex row">
    </div>
    <Avatar avatar="" size="92" status="0"/>
  </div>
  <div class="profile__body">
    <div class="flex column">
      <div class="nickname">{{ user.nickname }}</div>
      <div class="name">{{ user.name }}</div>
      <div class="union flex row center" v-if="friends || servers">
        <!-- Общее между юзером и мной -->
        <div class="friends flex row center" v-if="friends">
          <ImgQueue :imgs="imgs" size="18" borderColor="var(--system-back-color1)"/>
          <p>{{ friends }} общих {{ cases('друг', friends) }}</p>
        </div>
        <span v-if="servers">•</span>
        <div class="servers" v-if="servers">
          {{ servers }} общих {{ cases('сервер', servers) }}
        </div>
      </div>
      <div class="description" v-if="description" :style="{
        'margin-top': !(friends || servers) ? '15px' : null,
      }">{{ description }}</div>
      <span>В числе участников с</span>
      <div class="datareg">{{ user.datareg || '11 нояб. 2022 г.' || "Незапамятных времен" }}</div>
    </div>
  </div>
</template>
<script setup>
import Avatar from './Avatar.vue';
import ImgQueue from './ImgQueue.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});
let imgs = [require('@/assets/img/Discovery.svg'),require('@/assets/img/Discovery.svg'),"https://wow.zamimg.com/images/wow/icons/large/inv_glyph_minorpaladin.jpg","https://lh3.googleusercontent.com/-uWZOneHoOIY/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkkGAs8CnUvfbKj2YQxsAYYdxYGN_g/photo.jpg?sz=46","https://avatars.githubusercontent.com/u/28786802?v=4&size=40","https://avatars.githubusercontent.com/u/51343579?s=60&v=4"];
let friends = 4;
let servers = 3;
let description = "Software";

function cases (word, number) {
  // Проверяем, что число - целое
  number = Math.abs(Math.floor(number));
  
  // Определяем последнюю цифру и последние две цифры
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  
  // Правила склонения для русского языка
  // 1 - именительный падеж (сервер, друг)
  // 2-4 - родительный падеж ед.ч. (сервера, друга)
  // 5-0 - родительный падеж мн.ч. (серверов, друзей)
  
  let result = '';
  
  // Особые случаи для слова "друг"
  const forms = {
      'друг': {
          one: 'друг',
          few: 'друга',
          many: 'друзей'
      },
      'сервер': {
          one: 'сервер',
          few: 'сервера',
          many: 'серверов'
      }
  };
  
  // Проверяем исключения (11-14)
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      result = forms[word].many;
  } else {
      switch (lastDigit) {
          case 1:
              result = forms[word].one;
              break;
          case 2:
          case 3:
          case 4:
              result = forms[word].few;
              break;
          default:
              result = forms[word].many;
      }
  }
  
  return result;
}
</script>
<style lang="scss">
.profile__head {
  height: 100px;
  border-bottom: 1px solid var(--system-back-color2);
  background-color: var(--system-purple-color);
  .avatar {
    top: 55%;
    border: 6px solid var(--system-back-color1);
  }

}
.profile__body {
  padding-top: 50px;
  color: var(--main-text-color);    
  font-size: 11px;
  font-family: 'Inter-600';
  .nickname {
    font-family: var(--font-family-800);
    font-size: 18px;
  }
  .name {
    font-size: 14px;
    font-family: var(--font-family-400);
    margin-top: 3px;
  }
  .union {
    margin-block: 15px;
    color: var(--muted-text-color);
    .friends {
      column-gap: 5px;
      cursor: pointer;
      margin-right: 5px;
      &:hover p {
        text-decoration: underline;
      }
      .img-queue {
        margin-right: 5px;
      }
    }
    .servers {
      margin-left: 5px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .description {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .datareg {
    font-size: 13px;
    font-family: 'Noto-400';
    margin-top: 8px;
  }
}
</style>