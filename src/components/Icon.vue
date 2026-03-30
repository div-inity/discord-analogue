<template>
  <span 
    class="icon" 
    v-html="iconSvg" 
    :style="{ width: size + 'px', height: size + 'px' }"
    v-bind="$attrs"
  ></span>
</template>

<script setup>
import { computed } from 'vue';
import { mainIcons } from '@/assets/icons';

const props = defineProps({
  name: { type: String, required: true },
  size: { default: 24 }
});

const iconSvg = computed(() => mainIcons[props.name] || null);
</script>
<style lang="scss">
.icon {
  svg {
    height: inherit;
    width: inherit;
  }
}
</style>