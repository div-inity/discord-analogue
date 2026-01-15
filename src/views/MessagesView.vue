<template>
  <div class="messages-wrapper flex row">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title v-if="dialog?.id">
          <!-- Мульти-аватар -->
          <Avatar  :size="30" v-if="dialog.names.length > 1" multy :avatars="dialog.avatars"
            outline="var(--system-back-color2)"></Avatar>

          <!-- Сингл-аватар -->
          <Avatar :status="dialog.status" :size="30" v-else :avatar="dialog.avatars[0]"></Avatar>
            
          <!-- Мульти-имя -->
          <div 
            v-if="dialog.names.length > 1"
            class="dialog-name-multy dialog-name" 
            
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" 
            :class="{ hovered: isHovered }"
            ><!-- :class="{ hovered: isHovered }" -->
            <span v-tippy="{ content: 'Редактировать группу', placement: 'bottom'}">{{ dialogNames(dialog.id) }} {{ dialog.names.length > 1 }}</span>
              
          </div>

          <!-- Сингл-имя -->
          <div 
            v-else-if="dialog.names.length == 1"
            class="dialog-name-single dialog-name" 
            v-tippy="{ content: dialog.name, placement: 'bottom'}"
          >
            {{ dialogNames(dialog.id) }}
          </div>

          
        </template>

        <!-- Алиасы для сингл-имени -->
        <template v-slot:other v-if="dialog.names.length == 1">
          <Divider v :height="50" color="var(--system-back-color1)"/>
          <div class="aliases flex row" v-if="aliases.length">
            <span class="aka">AKA</span>
            <div class="item" v-for="a in aliases" :key="a.id" v-tippy="{ content: a.server, placement: 'bottom'}">
              {{ a.name }}<span v-if="a.id != aliases.length - 1">,&ensp;</span>
            </div>
          </div>
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

/* const name = computed(() => {
  return store.state.private_msg.dialogs.find(d => d.id == route.params.id);
}) */

const aliases = ref([
  {
    id: 0,
    name: 'Васька',
    server: 'Мишкина каморка',
  },
])
console.log(aliases.value.length)
console.log(aliases.value[0]);

const isHovered = ref(false);

function onMouseEnter() {
  isHovered.value = true;
}

function onMouseLeave() {
  isHovered.value = false;
}
</script>
<style lang="scss">
  .page-title:has(.dialog-name-multy.hovered) {
    background-color: var(--system-back-color1);
}
  .aliases {align-items: center;
    .aka {
      font-size: 13px;
      margin-right: 14px;
    }
    .item {
      padding: 0;
      cursor: pointer;
      color: var(--main-text-color);
      font-size: 15px;
      font-family: var(--font-family-400);
      span {
        padding: 0;
      }
    }
  }
  .dialog-name {
    cursor: pointer;
    &.dialog-name-multy {

    }
    &.dialog-name-single {
    
    }
  }
  
</style>00.
.