<template>
  <div class="content flex" :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }">
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
const { headerWidth } = generalFunctions();
const props = defineProps({
  RightAside: { type: Number, required: false } // Для определения размеров контента
})
const contentHeight = computed(() => {
  return window.innerHeight - 50;
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
  height: 100%;
  padding: 15px 25px;
}
</style>