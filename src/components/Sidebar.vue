<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-header">
      <input type="text" placeholder="Find or start a conversation">
    </div>
    sidebar
  </div>
</template>
<script>
</script>
<style lang="scss">
.sidebar-wrapper {
  height: 100%;
  width: 240px;
  background-color: var(--system-back-color3);
  border-radius: 7px 0 0 0;

  .sidebar-header {
    height: 50px;
    width: 100%;
    padding: 10px;
    box-shadow: 0px 1px 2px #232527;

    input {
      height: 100%;
      width: 100%;
    }
  }

}
</style>