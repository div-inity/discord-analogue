<template>
  <div class="friends-container flex row">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title>
          <Icon name="friend" size="25"/>
          Друзья
        </template>
        <template v-slot:other>
          <Divider v :height="40" color="var(--system-back-color1)" />
          <nav class="friends-header-nav flex row">
            <button @click="setMode(nl)" v-for="nl in navLinks" :class="{ active: mode == nl }">
              <RouterLink :to="{ name: 'friend-list' }">{{ nl }}</RouterLink>
            </button>
            <RouterLink :to="{ name: 'add-friend' }" @click="mode = null" class="add-friend">Add Friend</RouterLink>
          </nav>
        </template>
      </ContentHeader>
      <ContentFlex>
        <Content :RightAside="350">
          <RouterView></RouterView>
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
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue';
import { useStore } from 'vuex';
import { useSocket } from '@/composables/useSocket';

// Иконки

import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import Divider from '@/components/Divider.vue';
import ContentFlex from '@/components/ContentFlex.vue';
import Content from '@/components/Content.vue';
import RightAside from '@/components/RightAside.vue';
import Icon from '@/components/Icon.vue';

const store = useStore();

const { socket } = useSocket({
  //'users:getFriendshipRequests': onMessage,
});

const allFriends = ref(store.state.friends.friends.added);
const friendsWithMode = ref(null);
const title = ref(null);
const mode = ref(null);
const setMode = (m) => { // Устанавливает мод, по которому выводятся друзья - онлайн, все и т.д.
  mode.value = m;
  switch (m) {
    case 'online': {
      title.value = "В сети";
      friendsWithMode.value = allFriends.value.filter(friend => friend.status !== 'offline')
      break;
    }
    case 'all': {
      title.value = "Всего друзей";
      friendsWithMode.value = allFriends.value;
      break;
    }
    case 'pending': {
      title.value = "Заявки в друзья";
      friendsWithMode.value = store.state.friends.friends.pending;
      break;
    }
    case 'blocked': {
      title.value = "Игнорируются";
      friendsWithMode.value = store.state.friends.friends.blocked;
      break;
    }
  }
};
const navLinks = [
  'online', 'all', 'pending', 'blocked'
];

onMounted(() => {
  setMode("online")
});

provide('title', title);
provide('list', friendsWithMode);

</script>
<style lang="scss">

.friends-container {
  .input-wrapper {
    margin-top: 10px;
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