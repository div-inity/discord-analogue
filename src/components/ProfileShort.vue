<template v-if="user">
  <div class="profile__head">
    <div class="profile__actions flex row">
    </div>
    <Avatar avatar="" size="92" status="0"/>
  </div>
  <div class="profile__body">
    <div class="flex column">
      <div class="nickname">{{ user.nickname }}</div>
      <div class="name">{{ user.name }}</div>
      <div class="union flex row">
        <!-- Общее между юзером и мной -->
        <div class="friends">{{ user.friends || null }}</div>
        <div class="servers">{{ user.servers || null }}</div>
      </div>
      <span>В числе участников с</span>
      <div class="datareg">{{ user.datareg || '11 нояб. 2022 г.' || "Незапамятных времен" }}</div>
    </div>
  </div>
</template>
<script setup>
import Avatar from './Avatar.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});
</script>
<style lang="scss">
.profile__head {
  height: 100px;
  border-bottom: 1px solid var(--system-back-color2);
  background-color: var(--system-purple-color);
  .avatar {
    top: 55%;
    border: 6px solid var(--system-back-color1);
  }

}
.profile__body {
  padding-top: 50px;
  color: var(--main-text-color);    
  font-size: 11px;
  font-family: 'Inter-600';
  .nickname {
    font-family: var(--font-family-800);
    font-size: 18px;
  }
  .name {
    font-size: 14px;
    font-family: var(--font-family-400);
    margin-top: 3px;
  }
  .union {}
  .datareg {
    font-size: 13px;
    font-family: 'Noto-400';
    margin-top: 8px;
  }
}
</style>