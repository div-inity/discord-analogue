<template>
  <ContentFlex>
    <Content :RightAside="350">
      <SystemNotify close type="info">
        <template v-slot:text>Ищете пользователей, которых вы заблокировали или игнорируете?&nbsp
          <a href="">Перейти в настройки</a>
        </template>
      </SystemNotify>
      <div class="input-wrapper">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M52.0667 56.7666C46.077 61.5549 38.4811 63.8678 30.8393 63.2301C23.1974 62.5924 16.0899 59.0526 10.9767 53.3377C5.8635 47.6229 3.13282 40.167 3.34561 32.5015C3.55839 24.8361 6.69848 17.5432 12.1209 12.1208C17.5432 6.69842 24.8362 3.55833 32.5016 3.34555C40.167 3.13276 47.623 5.86344 53.3378 10.9766C59.0526 16.0899 62.5924 23.1974 63.2301 30.8392C63.8679 38.481 61.555 46.077 56.7667 52.0666L72.3667 67.6333C72.6775 67.9441 72.924 68.3131 73.0922 68.7191C73.2604 69.1252 73.347 69.5604 73.347 70C73.347 70.4395 73.2604 70.8747 73.0922 71.2808C72.924 71.6869 72.6775 72.0558 72.3667 72.3666C72.0559 72.6774 71.6869 72.924 71.2809 73.0922C70.8748 73.2604 70.4396 73.3469 70 73.3469C69.5605 73.3469 69.1253 73.2604 68.7192 73.0922C68.3131 72.924 67.9442 72.6774 67.6334 72.3666L52.0667 56.7666ZM56.6667 33.3333C56.6667 36.3975 56.0632 39.4317 54.8906 42.2626C53.7179 45.0935 51.9992 47.6658 49.8325 49.8325C47.6658 51.9992 45.0936 53.7179 42.2626 54.8905C39.4317 56.0631 36.3975 56.6666 33.3334 56.6666C30.2692 56.6666 27.235 56.0631 24.4041 54.8905C21.5731 53.7179 19.0009 51.9992 16.8342 49.8325C14.6675 47.6658 12.9488 45.0935 11.7762 42.2626C10.6036 39.4317 10 36.3975 10 33.3333C10 27.1449 12.4584 21.21 16.8342 16.8341C21.2101 12.4583 27.145 9.99996 33.3334 9.99996C39.5217 9.99996 45.4567 12.4583 49.8325 16.8341C54.2084 21.21 56.6667 27.1449 56.6667 33.3333Z"
            fill="#ABABAB" />
        </svg>
        <input type="text" placeholder="Поиск" class="searchFriends" name="search-friends">

        <button>Send Friend Request</button>
      </div>
      <ListFriends :array="list">
        <template v-slot:title></template>
      </ListFriends>
    </Content>
    <RightAside :RightAside="350">
      <p class="friends-aside-title">Active Now</p>
      <div class="friends-aside-content flex column">
        <span>It’s quiet for now...</span>
        <p>When a friend start an activity - like playing a game or
          hanging out on voice - we’ll show it here!</p>
      </div>
    </RightAside>
  </ContentFlex>
</template>
<script setup>
import ContentFlex from '../ContentFlex.vue';
import Content from '../Content.vue';
import RightAside from '../RightAside.vue';
import SystemNotify from '../SystemNotify.vue';
import ListFriends from './ListFriends.vue';
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;

  svg {
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 20px;
    height: 20px;
  }

  input.searchFriends {
    border-radius: 8px;
    padding: 12px 160px 12px 40px;
    transition: .3 all;
    width: 100%;
    font-family: var(--font-family-400);

    &:focus {
      outline: 1px solid var(--link-color);

    }
  }

  button {
    position: absolute;
    right: 8px;
    background-color: var(--system-purple-color);
    color: var(--main-text-color);
    padding: 8px;
    filter: brightness(.8);
    cursor: pointer;

    &:hover {
      filter: none;
    }
  }
}

.right-aside {
  .friends-aside-title {
    font-family: var(--font-family-600);
    font-size: 20px;
    line-height: 120%;
    color: var(--main-text-color);
    height: 56px;
  }

  .friends-aside-content {
    align-items: center;
    row-gap: 8px;

    span {
      font-family: var(--font-family-600);
      font-size: 14px;
      line-height: 171%;
      color: var(--main-text-color);
    }

    p {
      font-family: var(--font-family-400);
      font-size: 11px;
      line-height: 145%;
      text-align: center;
      color: var(--muted-text-color);
    }
  }
}
</style>