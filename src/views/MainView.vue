<template>
  <div class="container main-container">
    <Navbar />
    <div class="content-wrapper">
      <router-view />
    </div>

  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
export default {
  name: "MainView",
  components: {
    Navbar
  }
};
</script>
<style lang="scss">
.main-container {
  height: calc(100vh - 24px);
  width: 100vw;
  display: flex;
  flex-direction: row;

  .content-wrapper {
    height: 100%;
    width: calc(100vw - 72px);
    background-color: var(--system-back-color2);
    display: flex;
    flex-direction: row;
  }
}
</style>
