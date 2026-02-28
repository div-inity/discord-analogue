<template>
  <span 
    class="icon" 
    v-html="iconSvg" 
    :style="{ width: size + 'px', height: size + 'px' }"
    v-bind="$attrs"
  ></span>
</template>

<script setup>
import { mainIcons, profileIcons, userActions } from '@/assets/icons'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 24 }
})

/* const iconSvg = userActions[props.name]?.replace(
  /<svg /, 
  `<svg width="${props.size}" height="${props.size}" `
) */
const iconSvg = userActions[props.name] || mainIcons[props.name] || profileIcons[props.name] || null
</script>