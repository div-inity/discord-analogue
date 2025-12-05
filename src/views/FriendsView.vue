<template>
  <div class="friends-container">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.77528 2H1C1 10.6232 4.77528 13.744 6.66292 14.0725V19H22C22 12.5942 17.2809 12.5942 13.9775 12.5942C6.66292 12.5942 4.77528 6.43478 4.77528 2Z"
              fill="#8E9297" />
            <path d="M13.9775 2.5C19.6405 2.5 19.6405 11.1232 13.9775 11.1232C8.0867 11.1232 8.31461 2.5 13.9775 2.5Z"
              fill="#8E9297" />
          </svg>
          Друзья
        </template>
        <template v-slot:other>
          <Divider v :height="40" color="var(--system-back-color1)" />
          <nav class="friends-header-nav flex row">
            <router-link v-for="nl in navLinks" :to="'/friends/' + nl.link"
              :class="{ active: activeLink() == '/friends/' + nl.link }">{{ nl.name }}</router-link>
            <a href="/friends/add" class="add-friend">Add Friend</a>
          </nav>
        </template>
      </ContentHeader>
      <router-view></router-view>
    </div>

  </div>
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import Divider from '@/components/Divider.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const activeLink = () => {
  return route.path;
}
activeLink()
const navLinks = reactive([
  {
    name: 'Online',
    link: 'online'
  },
  {
    name: 'All',
    link: 'all'
  },
  {
    name: 'Pending',
    link: 'pending'
  },
  {
    name: 'Blocked',
    link: 'blocked'
  },
])

</script>
<style lang="scss">
.friends-container {
  display: flex;
  flex-direction: row;
}
</style>