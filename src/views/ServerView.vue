<template>
  <Sidebar>
    <template v-slot:header>
      <button class="server-name"><Icon name="communityServer" size="18"/>Мишкина каморка</button>
    </template>
    <template v-slot:other>
      Нужно бустов
    </template>
  </Sidebar>
  <router-view />serverview
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Icon from '@/components/Icon.vue';
</script>
<style lang="scss">
.server-name {
  background-color: transparent;
}
</style>