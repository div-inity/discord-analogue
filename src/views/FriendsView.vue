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
              {{ nl }}
            </button>
            <a href="/friends/add" class="add-friend">Add Friend</a>
          </nav>
        </template>
      </ContentHeader>
      <ContentFlex>
        <Content :RightAside="350">
          <TextField>
            <template v-slot:prefix>
              <Icon name="search" size="18"/>
            </template>
          </TextField>
          <FriendList :list="friendsWithMode || []">
            <template v-slot:title>{{ title }} &#8211 {{ friendsWithMode?.length || 0 }}</template>
          </FriendList>
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
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

// Иконки
import Icon from '@/components/Icon.vue';

import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import Divider from '@/components/Divider.vue';
import ContentFlex from '@/components/ContentFlex.vue';
import Content from '@/components/Content.vue';
import RightAside from '@/components/RightAside.vue';
import FriendList from '@/components/FriendList.vue';
import TextField from '@/components/TextField.vue';

const store = useStore();

const allFriends = ref(store.state.friends.friends.added);
const friendsWithMode = ref(null);
const title = ref(null);
const mode = ref(null);
const setMode = (m) => { // Устанавливает мод, по которому выводятся друзья - онлайн, все и т.д.
  mode.value = m
  //console.log(mode.value)
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