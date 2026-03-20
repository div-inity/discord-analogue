<template>
  <div class="right-aside" :style="{ width: widthAside + 'px', height: asideHeight + 'px' }">
    <slot>
    </slot>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { generalFunctions } from '@/composables/generalFunctions';

const { windowWidth, windowHeight, headerHeight } = generalFunctions();

const props = defineProps({
  RightAside: { type: Number, required: false }
});

const asideHeight = computed(() => {
  return windowHeight.value - headerHeight.value;
});

function updateWidth () {
  windowWidth.value = window.innerWidth;
};

function updateHeight () {
  windowHeight.value = window.innerHeight;
};

const widthAside = computed(() => {
  if (windowWidth.value > 1195)
    return (props.RightAside > 0) ? props.RightAside : 0;
  else return 0;
});

onMounted(() => {
  window.addEventListener('resize', updateHeight);
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight);
  window.removeEventListener('resize', updateWidth);
});

</script>
<style lang="scss">
.right-aside {
  background-color: var(--system-back-color1);
  border-left: 1px solid var(--system-back-color5);
  padding: 16px;
  overflow: hidden;

  & > * {
    max-width: 100%;
  }
}
</style>