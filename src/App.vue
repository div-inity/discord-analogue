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
import { onMounted } from 'vue';

import { useTheme } from '@/composables/useTheme';
import { userComposable } from './composables/userComposable';
import { dialogComposable } from './composables/dialogComposable';

const { currentTheme, toggleTheme, isDark } = useTheme();
const { loadUser, user, userToken } = userComposable();
const { setDialogs } = dialogComposable();

onMounted(() => {
  if (userToken.value && !user.value.id)
    loadUser();
  if (!!user.value.id && userToken.value != null) { 
    setDialogs();
  }
});

</script>

<style lang="scss">
@import "./styles/main.scss";
@import './styles/tippy-custom-theme.css';

html {
  background-image: none;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
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