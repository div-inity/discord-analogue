<template>
  <div class="container main-container" v-if="!!user.id == true">
    <Navbar />
    <div class="content-wrapper">
      <router-view />
    </div>

  </div>
  <div v-else class="container flex column">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { generalFunctions } from '@/composables/generalFunctions';
const { user } = generalFunctions();
//console.log(!!user.id, user.value.id)
</script>
<style lang="scss">
body {
  background-image: none;
}

.main-container {
  height: calc(100vh - 24px);
  width: 100vw;
  display: flex;
  flex-direction: row;

  .content-wrapper {
    height: 100%;
    width: calc(100vw - 68px);
    background-color: var(--system-back-color2);
    display: flex;
    flex-direction: row;
    border-radius: 7px 0 0 0;
  }
}
</style>
