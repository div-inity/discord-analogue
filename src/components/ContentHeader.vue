<template>
  <div class="content-header flex row" :class="setHeaderClass()" :style="{ width: headerWidth + 'px' }">
    <div class="flex row content-header-body">
      <div class="page-title flex row">
        <slot name="page-title">
          Без имени
        </slot>
      </div>
      <slot name="other"><!-- Прочие элементы header-а --></slot>
    </div>
    <div class="header-actions flex row">
      <slot name="actions">
      </slot>
    </div>
  </div>
</template>
<script setup>
import { headerWidth } from '@/composables/generalFunctions';
import { useRoute } from 'vue-router';
const route = useRoute();
const setHeaderClass = () => {
  if (route.matched[1].path == '/friends') return 'friends-header';
  else if (route.matched[1].path == '/messages') return 'messages-header';
};
</script>
<style lang="scss">
.content-header {
  min-height: 50px;
  width: 561px;
  min-width: 552px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  .content-header-body {
    align-items: center;
    column-gap: 12px;
    font-family: var(--font-family-400);
    color: var(--loud-text-color);    
    padding-inline: 13px;
    flex-grow: 1;
    position: relative;
    z-index: 1;

    .page-title {
      padding-inline: 12px;
      column-gap: 14px;
      align-items: center;
      border-radius: 8px;
      height: 76%;
    }
  }


  .header-actions {
    height: inherit;
    align-items: center;
    padding-right: 13px;
    position: absolute;
    z-index: 100;
    right: 0;
    background-color: var(--system-back-color2);
    border-bottom: 1px solid var(--system-back-color5);

    button {
      height: 100%;
      width: 50px;
      padding: 13px;
      display: inline-flex;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        svg * {
          fill: var(--main-text-color);
        }
      }

      svg {
        height: 100%;
        width: inherit;
        * {
          transition: 0.3s fill;
        }
      }
    }
  }
  
  &.friends-header {
    .content-header-body {
      justify-content: unset;
    }

    .friends-header-nav {
      height: 100%;
      align-items: center;
      column-gap: 14px;

      button {
        transition: .3s all;
        border-radius: 9px;
        padding: 8px 12px;
        background-color: transparent;
        cursor: pointer;
        text-transform: capitalize;

        a {
          color: var(--muted-text-color);
          font-family: var(--font-family-400);
          font-size: 14px;
        }

        &:hover {
          background: var(--button-back-color);

          a {
            color: var(--loud-text-color);
          }
        }

        &.active {
          background: var(--button-back-color);

          a {
            color: var(--loud-text-color);
          }
        }
      }

      .add-friend {
        background-color: var(--system-purple-color);
        color: var(--loud-text-color);
        font-family: var(--font-family-400);
        font-size: 14px;
        width: 92px;
        height: 35px;
        padding: 0 !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 9px;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
}
</style>