<template>
  <div class="list-friends-wrapper">
    <p class="title-list-friends">
      <slot name="title">Название списка друзей</slot>
    </p>
    <div class="list-friends flex column">
      <div class="list-friends-item flex row" v-for="item in props.list">
        <div class="avatar radial">
          <img v-if="item.avatar" :src="item.avatar" alt="" class="user-custom-avatar">
          <img v-else src="@/assets/img/svg/logo.svg" alt="" class="user-logo">
          <div class="status radial" :class="item.status"></div>
        </div>
        {{ item.name }}
      </div>
    </div>
  </div>

</template>
<script setup>
const props = defineProps({
  list: {
    type: Object,
    required: true,
  }
})
</script>
<style lang="scss">
.list-friends-wrapper {
  font-family: var(--font-family-400);

  .title-list-friends {
    color: var(--main-text-color);
    font-size: 14px;
  }

  .list-friends {
    .list-friends-item {
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
        overflow: hidden;


        img {
          background-position: center center;
          object-fit: contain;
          width: 100%;
          height: 100%;


          &.user-custom-avatar {}

          &.user-logo {
            height: 21.22px;
            width: 28px;
          }
        }

        .status {}
      }
    }
  }
}
</style>