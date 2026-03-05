<template>
  <div class="input-wrapper flex row" :style="{
    height: props.height ? props.height + 'px' : null,
    width: props.width ? props.width + '%' : null,
    'border-radius': props.radius ? props.radius + 'px' : '8px',
    padding: props.padding ? props.padding + 'px' : '0 12px',
    'background-color': props.color ? props.color : 'var(--system-back-color5)',
    'border-color': props.border ? props.border : 'var(--system-back-color1)'
  }">
    <!-- <span class="icon" v-html="mainIcons.search" v-if="props.icon == 'search'"></span> -->
    <div class="prefix flex row">
      <slot name="prefix"></slot>
    </div>
    <input type="text" :placeholder="props.placeholder || 'Поиск'" name="input" autocomplete="off">
    <slot name="actions"></slot>
    <button v-if="props.icon == 'search' && props.button == true">
      <slot name="button">Поиск</slot>
    </button>
    <div class="postfix flex row">
      <slot name="postfix">
      </slot>
    </div>
  </div>
</template>
<script setup>
import { mainIcons } from '@/assets/icons'
const props = defineProps({
  //prefix: Boolean,
  //postfix: Boolean,
  icon: String,
  height: String,
  width: String,
  radius: String,
  button: Boolean,
  placeholder: String,
  color: String,
  border: String,
});
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* border-radius: 8px; */
  width: 100%;
  min-width: 250px;
  height: 55px;
  min-height: 55px;
  /* padding: 12px; */
  column-gap: 12px;
  font-family: var(--font-family-400);
  border: 1px solid;

  /* &:focus-within {
    outline: 1px solid var(--link-color);
  } */

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 20px;
    height: 20px;

    svg {}
  }

  .prefix, .postfix {
    height: 100%;
    column-gap: 8px;
    align-items: center
  }

  input {
    flex-grow: 2;
    font-size: 15px;
    height: 100%;
    background-color: transparent;
    font-family: var(--font-family-400);

    &::placeholder {
      color: var(--icon-color);
    }
  }

  button {
    cursor: pointer;
    height: 30px;
    width: 30px;
    padding-inline: 10px;
    /* background-color: var(--system-purple-color); */
    background-color: transparent;
    color: var(--loud-text-color);
    /* filter: brightness(.9); */
    font-size: 14px;
    transition: .3s background-color;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    &:hover {
      filter: none;
      background-color: var(--system-back-color1);
      svg * {
        fill: white;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      width: inherit;
      height: inherit;

      svg *{
        transition: .3s fill;
      }
    }
  }
}

@media screen and (max-width: 725px) {
  .input-wrapper {
    column-gap: 4px;
  }
}
</style>