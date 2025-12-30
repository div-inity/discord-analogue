<template>
  <div class="messages-wrapper flex row">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title v-if="dialog?.id">
          <Avatar :status="dialog.status" :size="30" v-if="dialog.names.length > 1" multy :avatars="dialog.avatars"
            outline="var(--system-back-color2)"></Avatar>
          <Avatar :status="dialog.status" :size="30" v-else :avatar="dialog.avatars[0]"></Avatar>
          {{ dialogNames(dialog.id) }}
        </template>
      </ContentHeader>
      <ContentFlex>
        <Content :RightAside="350">
          {{ dialog }}
          <router-view />messagesview
        </Content>
        <RightAside :RightAside="350">
        </RightAside>
      </ContentFlex>
    </div>
  </div>

</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import Divider from '@/components/Divider.vue';
import ContentFlex from '@/components/ContentFlex.vue';
import Content from '@/components/Content.vue';
import RightAside from '@/components/RightAside.vue';
import Avatar from '@/components/Avatar.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { generalFunctions } from '@/composables/generalFunctions';
const { dialogNames } = generalFunctions();
const route = useRoute();
const store = useStore();
const dialog = computed(() => {
  return store.state.private_msg.dialogs.find(d => d.id == route.params.id);
});


</script>
<style lang="scss"></style>