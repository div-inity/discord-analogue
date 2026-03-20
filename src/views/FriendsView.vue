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
            <button @click="mode = nl; setMode(nl)" v-for="nl in navLinks" :class="{ active: mode == nl }">
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
import { ref, onMounted, provide, watch } from 'vue';
import { useStore } from 'vuex';
import { useSocket } from '@/composables/useSocket';
import { useRoute, useRouter } from 'vue-router';

import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import Divider from '@/components/Divider.vue';
import ContentFlex from '@/components/ContentFlex.vue';
import Content from '@/components/Content.vue';
import RightAside from '@/components/RightAside.vue';
import Icon from '@/components/Icon.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const { socket } = useSocket({
  'users:getFriends': getFriends,
});

const friends = ref(null);
const friendsWithMode = ref(null);
const title = ref(null);
const mode = ref(null);


//ПЕРЕДЕЛАТЬ ЛОГИКУ КОМПОНЕНТА, когда будут другие статусы отношений
const getFriendsByMode = (currentMode) => {
  //const friends = store.state.friends?.friends || {};
  store.commit('user/SET_FRIEND_LIST_MODE', currentMode);
  console.log(store.state.user.friendListMode)
  switch (currentMode) {
    case 'online':
      title.value = "В сети";
      return (friends.added || []).filter(friend => friend.status !== 'offline');
    case 'all':
      title.value = "Всего друзей";
      return friends || [];
    case 'pending':
      title.value = "Заявки в друзья";
      return friends.pending || [];
    case 'blocked':
      title.value = "Игнорируются";
      return friends.blocked || [];
    default:
      return [];
  }
};
// ПЕРЕДЕЛАТЬ - МОД ЗАПИСАТЬ В СТОР, ТАК КАК ПЕРЕХОД ПО ДИАЛОГАМ, а потом возврат в друзья 
// ДОЛЖЕН ВОЗВРАЩАТЬ В ЗАПИСАННЫЙ МОД
const setMode = (newMode) => {
  mode.value = newMode;
  friendsWithMode.value = getFriendsByMode(newMode);
  
  if (route.name !== 'friend-list') {
    router.push({ name: 'friend-list' });
  }
};
const navLinks = [
  'online', 'all', 'pending', 'blocked'
];

onMounted(() => {
  socket.emit('users:getFriends');
  mode.value = store.state.user.friendListMode;
  setMode(mode.value)
});


function getFriends(data) {
  //console.log(data)
  friends.value = data
}

watch(
  () => store.state.friends?.friends,
  () => {
    if (mode.value) {
      friendsWithMode.value = getFriendsByMode(mode.value);
    }
  },
  { deep: true }
);

provide('title', title);
provide('list', friends);
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