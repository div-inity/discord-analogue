<template>
  <div class="mentions radial"
    :style="{
      outline: (props.outlineColor) ? '3px solid ' + props.outlineColor : '3px solid var(--system-back-color5)'
    }"
  >
    <span class="mention-content">
      <slot>Test</slot>
    </span>
  </div>
</template>
<script setup>
const props = defineProps(['outlineColor'])
</script>
<style lang="scss">
.mentions {

}
</style>