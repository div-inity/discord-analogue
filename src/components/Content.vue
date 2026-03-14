<template>
  <div class="content flex column" :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }" @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <slot>
      content width:{{ headerWidth }}<br>
      content height:{{ contentHeight }}
    </slot>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { headerWidth, contentHeight } from '@/composables/generalFunctions';

const props = defineProps({
  RightAside: { type: Number, required: false } // Для определения размеров контента
});
const windowWidth = ref(window.innerWidth);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
const contentWidth = computed(() => {
  return (props.RightAside > 0 && windowWidth.value > 1195) ? headerWidth.value - props.RightAside : headerWidth.value;
});

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

</script>
<style lang="scss">
.content {
  height: 100vh;
  height: calc(100vh - 50px);
  min-width: 370px;
  position: relative;
  padding: 0 10px 10px;
}
</style>