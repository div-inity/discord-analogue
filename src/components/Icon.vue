<template>
  <span 
    class="icon" 
    v-html="iconSvg" 
    :style="{ width: size + 'px', height: size + 'px' }"
    v-bind="$attrs"
  ></span>
</template>

<script setup>
import { mainIcons, profileIcons, userActionsIcons, textFieldIcons, chatActionsIcons, sidebarIcons, serverIcons } from '@/assets/icons';

const props = defineProps({
  name: { type: String, required: true },
  size: { default: 24 }
});

const iconSvg = textFieldIcons[props.name] || 
  chatActionsIcons[props.name] || 
  sidebarIcons[props.name] || 
  userActionsIcons[props.name] || 
  mainIcons[props.name] || 
  profileIcons[props.name] || 
  serverIcons[props.name] ||
  null;
</script>
<style lang="scss">
.icon {
  svg {
    height: inherit;
    width: inherit;
  }
}
</style>