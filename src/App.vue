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
    router.push('/auth')
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

html {
  background-image: none;
}

#app {
  height: 100vh;
  width: 100vw;
}

header {
  width: 100%;
  height: 24px;
  background-color: var(--system-back-color5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-content: space-between;
  padding-left: 8px;


  .logo {
    font-family: 'inter-600';
    font-size: 12px;
    line-height: 133%;
    color: #fff;
  }

  .header-actions {
    display: flex;
    height: inherit;

    .header-action {

      &:hover {
        rect {
          fill: #4d4d4d;
        }
      }

      /* .cross:hover { не работает
        rect {
          fill: red !important;
        }
      } */
    }
  }
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
  bottom: 90%;

  &:hover {
    opacity: 0.8;
  }
}
</style>