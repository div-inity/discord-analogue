<template>
  <div class="content-flex flex row">

    <Content :RightAside="200">

    </Content>
    <RightAside :RightAside="200"></RightAside>
  </div>
</template>
<script setup>
import Content from '../Content.vue';
import RightAside from '../RightAside.vue';
</script>
<style lang="scss">
.content-flex {}
</style>