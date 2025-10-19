<template>
  <!-- <button @click="toggleTheme" class="theme-switcher">
    {{ isDark ? '☀️' : '🌙' }} {{ currentTheme }}
  </button> -->
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
import { useRouter } from 'vue-router'
const router = useRouter()

import { useTheme } from '@/composables/useTheme'
const { currentTheme, toggleTheme, isDark } = useTheme()

const checkAuth = () => {
  const user = store.getters['user/getUser']
  if (!user.id) {
    router.push('/auth')
  }
}
import { onMounted } from 'vue'
onMounted(() => {
  checkAuth()
})
</script>

<style lang="scss">
@import "./styles/main.scss";

.theme-switcher {
  background: var(--button-back-color);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  color: var(--main-text-color);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}
</style>