<template>
  <header>
    <div class="logo">{{ PROJECT_NAME }}</div>
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
</template>
<script setup>
import { PROJECT_NAME } from '@/composables/generalFunctions';
</script>
<style lang="scss">
header {
  width: 100%;
  height: 24px;
  background-color: #1e1f22;
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
    color: var(--muted-text-color);
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
    }
  }
}
</style>