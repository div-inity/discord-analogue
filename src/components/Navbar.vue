<template>
  <div class="navbar">
    <div class="private-messages">
      <router-link to="/messages"></router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const servers = reactive([
  {
    id: 1,
    name: "Test",
    notifies: 71,
    last_message: "2025-21-04",
    avatar: require('@/assets/img/Server Icon.svg'),
  },
  {
    id: 2,
    name: "Nice cats",
    notifies: 15,
    last_message: "2025-21-03",
    avatar: require('@/assets/img/Server Icon1.svg'),
  },
  {
    id: 3,
    name: "Help yourself",
    notifies: 1003,
    last_message: "2025-10-03",
    avatar: require('@/assets/img/Server Icon2.svg'),
  },
]);
const messages = reactive([
  {
    id: 1,
    userName: "Анна Шатова",
    notifies: 1,
    last_message: "2025-21-03",
    avatar: require('@/assets/img/Server Icon1.svg'),
  }
])
</script>
<style lang="scss">
.navbar {
  background-color: var(--system-back-color5);
  width: 72px;
  height: 100%;
}
</style>