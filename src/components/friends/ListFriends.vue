<template>
  <div class="list-friends-wrapper">
    <p class="title-list-friends">
      <slot name="title">Название списка друзей</slot>
    </p>
    <div class="list-friends flex column">
      <div class="list-friends-item flex row" v-for="item in props.list">
        <!-- <div class="avatar radial">
          <img v-if="item.avatar" :src="item.avatar" alt="" class="user-custom-avatar">
          <img v-else src="@/assets/img/svg/logo.svg" alt="" class="user-logo">
          <div class="status radial" :class="item.status"></div>
        </div> -->
        <Avatar :avatar="item.avatar" :size="50" :status="item.status"></Avatar>
        {{ item.name }}
      </div>
      <!-- <Avatar :avatar="props.list[0].avatar" :size="50" square mentions="1204" activity="call" active></Avatar>
      {{ props.list[0].name }} -->
    </div>

    <Avatar :avatars="ava" :size="50" multy status="online" activity="call" active></Avatar>
  </div>

</template>
<script setup>
import { ref, computed } from 'vue';
import Avatar from '../Avatar.vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  list: {
    type: Object,
    required: true,
  }
})
/* const ava = computed(() => {
  const arr = [];
  for (i in store.state.private_msg.missed_messages.length) {
    arr.push(i.ava)
  }
}) */
const ava = ref(["", store.state.private_msg.missed_messages[0].avatars])
console.log(ava.value)
</script>
<style lang="scss">
.list-friends-wrapper {
  font-family: var(--font-family-400);

  .title-list-friends {
    color: var(--main-text-color);
    font-size: 14px;
  }

  .list-friends {
    gap: 20px;

    .list-friends-item {
      /* .avatar {
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
      } */
    }
  }
}
</style>