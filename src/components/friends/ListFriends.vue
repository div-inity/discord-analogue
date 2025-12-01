<template>
  <p class="title-list-friends">
    <slot name="title">Название списка друзей</slot>
  </p>
  <div class="list-friends">

  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Object,
    required: true,
  }
})
</script>