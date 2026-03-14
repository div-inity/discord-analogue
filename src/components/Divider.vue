<template>
  <div
    class="divider"
    :class="{
      'h-divider': props.h,
      'v-divider': props.v,
    }" 
    :style="{
      height: props.height ? props.height + '%' : null,
      width: props.width ? props.width + '%' : null,
      'background-color': props.color ? props.color : null
    }">
  </div>
</template>
<script setup>
const props = defineProps({
  height: { // высота в процентах
    require: false,
  },
  width: { // ширина в процентах
    require: false,
  },
  color: { // цвет разделителя
    type: String,
    require: false,
  },
  v: { // Вертикальный разделитель
    type: Boolean,
    require: false,
  },
  h: { // горизонтальный разделитель
    type: Boolean,
    require: false,
  },
});
</script>
<style lang="scss" scoped>
.divider {
  display: block;
  background-color: #2d2f32;
  border-radius: 1px;

  &.h-divider {
    // горизонтальный разделитель
    height: 1px;
    margin-inline: auto;
  }

  &.v-divider {
    // Вертикальный разделитель
    width: 1px;
    margin-block: auto;
  }
}
</style>