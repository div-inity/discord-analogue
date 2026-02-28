<template>
  <transition name="fade-slide">
    <div class="hint" v-if="show">
      <p class=" flex row" :style="[{ color: props?.color }]">
        <i v-if="props?.icon == 'info'" v-html="mainIcons.info">
        </i>
        {{ props.text }}
      </p>
    </div>
  </transition>
</template>
<script setup>
import { mainIcons } from '@/assets/icons';
const props = defineProps({
  color: {
    required: false,
    type: String,
  },
  icon: {
    required: false,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

</script>
<style lang="scss" scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 10px;
}

body {
  font-family: var(--Ubuntu);

  .hint {
    max-height: max-content;
    min-height: 0;
    transition: all 1s;

    p {
      color: var(--muted-text-color);
      font-size: 13px;
      line-height: 163%;
      text-align: left;

      i {
        width: 17px;
        display: inline-flex;
        margin-right: 3px;
        height: 17px;
      }
    }
  }
}
</style>