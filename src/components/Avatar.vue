<template>
  <div class="avatar single-user-avatar radial" v-if="!props.multy && props.avatar"
    :style="{ width: (props.width) ? props.width + 'px' : null, height: (props.width) ? props.width + 'px' : null }"
    :class="props.square && 'square'">
    <img class="single-avatar radial" :src="props.avatar">
    <div v-if="props.status" class="status radial" :class="props.status"></div>
    <div v-if="props.mentions" class="mentions radial">{{ props.mentions }}</div>
  </div>
  <div class="avatar single-user-avatar radial user-logo" v-else-if="!props.multy && !props.avatar"
    :style="{ width: (props.width) ? props.width + 'px' : null, height: (props.width) ? props.width + 'px' : null }"
    :class="props.square && 'square'">
    <img class="single-avatar radial" src="@/assets/img/svg/logo.svg">
    <div v-if="props.status" class="status radial" :class="props.status"></div>
  </div>

  <div class="avatar multi-user-avatar" v-else-if="props.multy && props.avatars"
    :style="{ width: (props.width) ? props.width + 'px' : null, height: (props.width) ? props.width + 'px' : null }">
    <img class="multi-avatar radial" :src="props.avatars[0] || '@/assets/img/svg/logo.svg'"
      :class="!props.avatars[0] && 'user-logo'">
    <img class="multi-avatar radial" :src="props.avatars[1] || '@/assets/img/svg/logo.svg'"
      :class="!props.avatars[0] && 'user-logo'">
    <div v-if="props.status" class="status radial" :class="props.status"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  status: {
    type: String,
    required: false
  },
  activity: {
    type: String,
    required: false
  },
  mentions: {
    type: String,
    required: false
  },
  square: {
    type: Boolean,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  avatars: { // Для вывода двух аватаров
    type: Object,
    required: false
  },
  multy: { // Выводит два аватара 
    type: Boolean,
    required: false
  },
  width: {
    type: Number,
    required: false
  }
})
/* console.log(props.avatars[0]) */
</script>
<style lang="scss" scoped>
.avatar {
  position: relative;

  .mentions {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  &.square {
    img {
      border-radius: 13px;
    }
  }

  .single-user-avatar {
    img.single-avatar {}
  }

  .multi-user-avatar {
    img.multi-avatar {}
  }
}

.user-logo {
  background-color: var(--system-purple-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 18%;
  }
}

img {
  background-position: center center;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>