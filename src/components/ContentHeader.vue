<template>
  <div class="content-header flex row" :class="setHeaderClass()" :style="{ width: headerWidth + 'px' }">
    <span class="flex row">
      <slot name="page-title">
        Без имени
      </slot>
      <slot name="other">Прочие элементы header-а</slot>
    </span>

  </div>
</template>
<script setup>
import { generalFunctions } from '@/composables/generalFunctions';
const { headerWidth } = generalFunctions();
import { useRoute } from 'vue-router';
const route = useRoute();
//console.log(route.matched[1].path)
const setHeaderClass = () => {
  console.log(route.matched[1].path == '/friends')
  if (route.matched[1].path == '/friends') return 'friends-header';
};
</script>
<style lang="scss">
.content-header {
  min-height: 50px;

  &.friends-header {
    span {
      align-items: center;
      justify-content: center;
      column-gap: 12px;
    }

    .friends-header-nav {
      height: 100%;
      align-items: center;
      column-gap: 14px;
      margin-left: 14px;

      a {
        color: var(--muted-text-color);
        font-family: var(--font-family-400);
        font-size: 14px;
        transition: .3s all;
        border-radius: 9px;
        padding: 8px 12px;

        &:hover:not(.add-friend) {
          color: var(--loud-text-color);
          background: var(--button-back-color);
        }
      }

      .add-friend {
        background-color: var(--system-purple-color);
        color: var(--loud-text-color);

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
}
</style>