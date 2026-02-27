<template>
  <Header></Header>
  <div id="app" :class="`theme-${currentTheme}`">
    <button @click="toggleTheme" class="theme-switcher">
      {{ isDark ? '☀️' : '🌙' }} {{ currentTheme }}
    </button>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
const { currentTheme, toggleTheme, isDark } = useTheme();

import { userComposable } from './composables/userComposable';
const { loadUser } = userComposable();

import { useStore } from 'vuex';
const store = useStore();
onMounted(() => {
  loadUser();
  //store.dispatch('private_msg/getDialogs')
  
})
</script>

<style lang="scss">
@import "./styles/main.scss";
@import './styles/tippy-custom-theme.css';

html {
  background-image: none;
  /* min-width: 796px;
  min-height: 380px; */
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
  /* min-width: 800px;
  min-height: 380px; */
}

.theme-switcher {
  background: var(--button-back-color);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  color: var(--main-text-color);
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  bottom: 0;

  &:hover {
    opacity: 0.8;
  }
}
</style>