<template>
  <div 
    v-if="!props.multy && props.avatar"
    class="avatar single-user-avatar radial"
    :class="{ 'square': props.square }"
    :style="{
      width: props.size ? props.size + 'px' : null,
      'min-width': props.size ? props.size + 'px' : null,
      height: props.size ? props.size + 'px' : null
    }">
    <img class="single-avatar radial" :src="props.avatar" alt="User Avatar" />
    <div v-if="props.status" class="status radial" :class="props.status"></div>
    <div v-if="props.mentions && props.mentions > 0" class="mentions radial">
      {{ props.mentions < 1000 ? props.mentions : (props.mentions / 1000).toFixed(1) + 'k+' }}
    </div>
      <div
        v-if="props.activity"
        class="activity radial"
        :class="[defineActivity(), { 'my_activity': props.active === true }]"
      ></div>
  </div>

  <!-- Альтернатива, если props.avatar отсутствует -->
  <div 
    v-else-if="!props.multy && !props.avatar"
    class="avatar single-user-avatar radial user-logo"
    :style="{
      width: props.size ? props.size + 'px' : null,
      'min-width': props.size ? props.size + 'px' : null,
      height: props.size ? props.size + 'px' : null
    }"
    :class="{ 'square': props.square }">
    <img class="single-avatar radial" src="@/assets/img/svg/logo.svg" alt="Default Logo" />
    <!-- Статус -->
    <div v-if="props.status" class="status radial" :class="props.status"></div>
    <div v-if="props.mentions && props.mentions > 0" class="mentions radial">
      {{ props.mentions < 1000 ? props.mentions : (props.mentions / 1000).toFixed(1) + 'k+' }} </div>

        <div v-if="props.activity" class="activity radial"
          :class="[defineActivity(), { 'my_activity': props.active === true }]">
        </div>
  </div>

  <div
    v-else-if="props.multy || props.avatars"
    class="avatar multi-user-avatar"
    :style="{
    width: props.size ? props.size + 'px' : null,
    'min-width': props.size ? props.size + 'px' : null,
    height: props.size ? props.size + 'px' : null
  }">
    <img class="multi-avatar radial" :src="props.avatars?.[0] || require('@/assets/img/svg/logo.svg')"
      :class="{ 'user-logo': !props.avatars?.[0] }" alt="User Avatar 1" />
    <img class="multi-avatar radial" :src="props.avatars?.[1] || require('@/assets/img/svg/logo.svg')"
      :class="{ 'user-logo': !props.avatars?.[1] }" alt="User Avatar 2" :style="{
        'outline-color': props.outline ? props.outline : null
      }" 
    />
    <div v-if="props.status" class="status radial" :class="props.status"></div>
    <div class="activity radial" v-if="props.activity"
      :class="[defineActivity(), { 'my_activity': props.active === true }]"></div>
    <div v-if="props.mentions && props.mentions > 0" class="mentions radial">
      {{ props.mentions < 1000 ? props.mentions : (props.mentions / 1000).toFixed(1) + 'k+' }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  status: {
    type: String,
    required: false
  },
  activity: { //Активность - камера, звонок или дисплей
    type: String,
    required: false
  },
  active: { // Для зеленого цвета в activity
    type: Boolean,
    required: false
  },
  mentions: { // Упоминания
    required: false
  },
  square: { // Квадратный аватар
    type: Boolean,
    required: false
  },
  avatar: { // Для единичного аватара
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
  size: { // размер аватара
    type: String,
    required: false
  },
  outline: { // Для двойного аватара - цвет обводки
    type: String,
    required: false
  }
});

function defineActivity () {
  if (props.activity == 'call') return 'call';
  else if (props.activity == 'display') return 'display';
  else if (props.activity == 'camera') return 'camera';
  else return null;
};

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
    border-radius: 13px !important;

    img {
      border-radius: 13px !important;
    }
  }

  &.single-user-avatar {
    img.single-avatar {}
  }

  &.multi-user-avatar {
    width: 100%;
    position: relative;

    img.user-logo {
      object-fit: contain;
      padding: 11%;
    }

    img.multi-avatar {
      width: 60%;
      height: 60%;
      position: absolute;



      &:first-child {
        z-index: 1;
        left: 0;
        top: 0;
      }

      &:nth-child(2) {
        z-index: 2;
        right: 0;
        bottom: 0;

        outline: {
          width: 3px;
          style: solid;
          color: transparent;
        }
      }
    }
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
}

img:not(.multi-avatar) {
  width: 100%;
  height: 100%;
}
</style>