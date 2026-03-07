<template>
  <div class="content flex column" :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }" @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"> <!-- :class="{ hovered: isHovered }" -->
    <!-- contentHeight.value: {{ contentHeight }} -->
    <slot>
      content width:{{ headerWidth }}<br>
      content height:{{ contentHeight }}
    </slot>
    <!-- windowWidth:{{ windowWidth }} -->
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { generalFunctions } from '@/composables/generalFunctions';
const { headerWidth, contentHeight } = generalFunctions();
const props = defineProps({
  RightAside: { type: Number, required: false } // Для определения размеров контента
})
/* const contentHeight = computed(() => {
  return window.innerHeight - 50;
}); */
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
/* const isHovered = ref(false);

function onMouseEnter() {
  isHovered.value = true;
}

function onMouseLeave() {
  isHovered.value = false;
} */
</script>
<style lang="scss">
.content {
  /* min-height: 100%; */
  height: 100vh;
  /* padding: 15px 25px; */
  height: calc(100vh - 50px);
  row-gap: 15px;
  /* overflow-y: auto; */
  min-width: 370px;
  position: relative;
  padding-bottom: 10px;

  /* & > * {
    width: inherit;
    max-width: 100%;
  } */

  /* базовые стили scrollbar */
  /* &::-webkit-scrollbar {
    width: 8px;
  } */

  /* Target the scrollbar track (the background) */
  /* &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  } */

  /* Target the scrollbar thumb (the draggable handle) */
  /* &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: transparent;
  } */

  /* Меняем стиль при наведении на весь контейнер */
  /* &.hovered::-webkit-scrollbar-thumb {
    background: var(--system-back-color1);
  } */
}
</style>