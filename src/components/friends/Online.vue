<template>
  <ContentFlex>
    <Content :RightAside="200">
      <SystemNotify :close="true">
        <template v-slot:text>Ищете пользователей, которых вы заблокировали или игнорируете?&nbsp
          <a href="">Перейти в настройки</a>
        </template>
      </SystemNotify>
    </Content>
    <RightAside :RightAside="200"></RightAside>
  </ContentFlex>
</template>
<script setup>
import ContentFlex from '../ContentFlex.vue';
import Content from '../Content.vue';
import RightAside from '../RightAside.vue';
import SystemNotify from '../SystemNotify.vue';
</script>
<style lang="scss">
.system-notify {
  background-color: var(--system-back-color5);
  padding: 20px 15px;
  height: fit-content;
  border-radius: 4px;
  color: var(--main-text-color);
  font-family: var(--font-family-400);
  font-size: 13px;
  width: 100%;
  align-items: center;

  svg {
    height: 20px;
    width: 20px;

    &.icon-info {
      margin-right: 8px;
    }
  }

  p {
    flex-grow: 2;
  }
}
</style>