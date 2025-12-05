<template>
  <ContentFlex>
    <Content :RightAside="350">
      <TextField icon="search">
      </TextField>
      <ListFriends :list="online">
        <template v-slot:title>В сети &#8211 {{ online.length }}</template>
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
import ListFriends from './ListFriends.vue';
import TextField from '../TextField.vue';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
const store = useStore();
const allFriends = ref(store.state.user.friends);
const online = computed(() => {
  return allFriends.value.filter(friend => friend.status !== 'offline');
})
</script>
<style lang="scss">
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