<template>
  <div class="right-aside" :style="{ width: props.RightAside + 'px', height: contentHeight() + 'px' }">
    <slot>

    </slot>
    .right-aside {{ props.RightAside }}
  </div>
</template>
<script setup>
const props = defineProps({
  RightAside: { type: Number, required: false }
})
const contentHeight = () => {
  return window.innerHeight - 50;
};
</script>
<style lang="scss">
.right-aside {
  background-color: var(--system-back-color1);
  border-left: 1px solid var(--system-back-color5);
}
</style>