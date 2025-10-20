<template>
  <!-- <button @click="toggleTheme" class="theme-switcher">
    {{ isDark ? '☀️' : '🌙' }} {{ currentTheme }}
  </button> -->
  <header>
    <div class="logo">Discord Analogue</div>
    <div class="header-actions">
      <button class="header-action minus">
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="26" height="24" fill="#202225" />
          <path d="M6.5 12L19.5 12" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button class="header-action square">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#202225" />
          <path d="M14.4 6H9.6H6V9.6V14.4V18H9.6H14.4H18V14.4V9.6V6H14.4Z" stroke="white" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <button class="header-action cross">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#202225" />
          <path d="M6 6L18 18M18 6L6 18" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </header>
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

html {
  background-image: none;
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

  &:hover {
    opacity: 0.8;
  }
}
</style>