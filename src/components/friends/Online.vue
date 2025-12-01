<template>
  <ContentFlex>
    <Content :RightAside="200">
      <SystemNotify close type="info">
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
<style lang="scss"></style>