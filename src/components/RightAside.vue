<template>
  <div class="right-aside" :style="{ width: widthAside() + 'px', height: contentHeight() + 'px' }">
    <slot>

    </slot>
    .right-aside {{ props.RightAside }}
    windowWidth:{{ windowWidth }}
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const props = defineProps({
  RightAside: { type: Number, required: false }
})
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const contentHeight = () => {
  return windowHeight.value - 50;
};

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

const updateHeight = () => {
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', updateHeight);
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight);
  window.removeEventListener('resize', updateWidth);
});

const widthAside = () => {
  if (windowWidth > 1195)
    return (props.RightAside > 0) ? props.RightAside : 0;
  else return 0;
}

</script>
<style lang="scss">
.right-aside {
  background-color: var(--system-back-color1);
  border-left: 1px solid var(--system-back-color5);
}
</style>