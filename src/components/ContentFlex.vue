<template>
  <div class="content-flex flex row" :style="{ height: contentHeight + 'px' }">
    <slot></slot>
  </div>
</template>
<script setup>
import { contentHeight } from '@/composables/generalFunctions';
</script>
<style lang="scss">
</style>