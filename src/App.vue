<template>
  <div id="app" :class="`theme-${currentTheme}`">
    <button @click="toggleTheme" class="theme-switcher">
      {{ isDark ? '☀️' : '🌙' }} {{ currentTheme }}
    </button>
    <Header v-if="user"></Header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
const { currentTheme, toggleTheme, isDark } = useTheme()

const store = useStore()
const router = useRouter()

const user = computed(() => store.getters['user/getUser'])

const checkAuth = () => {
  //console.log('User', user.value);
  if (!user.value) {
    router.push('/login')
  } else {
    router.push({ name: 'friends' })
  }
}

onMounted(() => {
  checkAuth()
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