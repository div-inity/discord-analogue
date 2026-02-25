<template>
  <div class="content-flex flex row" :style="{ height: contentHeight + 'px' }">
    <slot></slot>
  </div>
</template>
<script setup>
import { generalFunctions } from '@/composables/generalFunctions';
const { contentHeight } = generalFunctions();
</script>
<style lang="scss">
.content-flex {}
</style>