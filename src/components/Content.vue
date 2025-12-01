<template>
  <div class="content flex" :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }">
    <slot>
      content width:{{ headerWidth }}<br>
      content height:{{ contentHeight }}
    </slot>
  </div>

</template>
<script setup>
import { computed } from 'vue';
import { generalFunctions } from '@/composables/generalFunctions';
const { headerWidth } = generalFunctions();
const props = defineProps({
  RightAside: { type: Number, required: false } // Для определения размеров контента
})
const contentHeight = computed(() => {
  return window.innerHeight - 50;
});
const contentWidth = computed(() => {
  return (props.RightAside > 0) ? headerWidth.value - props.RightAside : headerWidth.value;
});
</script>
<style lang="scss">
.content {
  height: 100%;
  padding: 15px 25px;
}
</style>