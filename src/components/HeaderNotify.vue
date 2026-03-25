<template>
  <div v-if="main" class="header-notify flex" :style="
    {
      backgroundColor: props.color || null,
      width: headerNotifyWidth + 'px',
    }"
  >
    <div class="prefix"><slot name="prefix">prefix</slot></div>
    <div class="main"><slot name="main">{{ main }}</slot></div>
    <div class="postfix"><slot name="postfix">postfix</slot></div>
  </div>
</template>
<script setup>
import { headerNotifyWidth, generalFunctions } from '@/composables/generalFunctions';
import { ref } from 'vue';
const {headerNotifyHeight} = generalFunctions();
const props = defineProps(['color'])
const main = ref(null);
console.log(headerNotifyHeight)
</script>
<style lang="scss">
.header-notify {
  background-color: var(--system-purple-color);
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>