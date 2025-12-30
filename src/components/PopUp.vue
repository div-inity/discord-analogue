<template>
  <div class="popup flex column">
    <slot name="items">
      Нет вложенных блоков
    </slot>
  </div>
</template>
<script setup>
</script>
<style lang="scss">
.popup {
  background-color: var(--system-back-color1);
  color: var(--main-text-color);
  border-radius: 8px;
  position: absolute;
  border: 1px solid var(--system-back-color3);
  font-family: var(--font-family-500);
  font-size: 12px;
  width: max-content;
  padding: 10px 10px;
  right: 35px;
  top: 30px;
  z-index: 40;

  a {
    width: 100%;
    background: transparent;
    color: var(--main-text-color);
    border-radius: 3px;
    filter: brightness(0.9);
    padding: 7px 8px;


    &:hover {
      filter: none;
      background-color: var(--button-back-color);
    }

    &.red {
      color: var(--notification-color);

      &:hover {
        background: #f23f421c;
      }
    }
  }
}
</style>