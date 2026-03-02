<template>
  <div class="messages-wrapper flex row">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title v-if="dialog?.id">
          <!-- Мульти-аватар -->
          <Avatar  size="30" v-if="dialog.names.length > 1" multy :avatars="dialog.avatars"
            outline="var(--system-back-color2)"></Avatar>

          <!-- Сингл-аватар -->
          <Avatar :status="dialog.status" size="30" v-else :avatar="dialog.avatars[0]"></Avatar>
            
          <!-- Мульти-имя -->
          <div 
            v-if="dialog.names.length > 1"
            class="dialog-name-multy dialog-name" 
            
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave" 
            :class="{ hovered: isHovered }"
            >
            <span v-tippy="{ content: 'Редактировать группу', placement: 'bottom'}">
              {{ dialogNames(dialog.id) }}
            </span>
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
        <!-- <template v-slot:other v-if="dialog?.names.length == 1">
          <Divider v :height="50" color="var(--system-back-color1)"/>
          <div class="aliases flex row" v-if="aliases.length">
            <span class="aka">AKA</span>
            <div class="item" v-for="a in aliases" :key="a.id" v-tippy="{ content: a.server, placement: 'bottom'}">
              {{ a.name }}<span v-if="a.id != aliases.length - 1">,&ensp;</span>
            </div>
          </div>
        </template>
        <template v-slot:actions>
          <button v-for="i in chatActions.header" v-html="i"></button>
          <TextField height="30" radius="4" :placeholder="'Искать «'+ dialog.custom_name || 'диалоге' +'»'" postfix style="margin-left: 13px;"/>
        </template> -->


      </ContentHeader>
      <ContentFlex>
        
        
        <Content :RightAside="WIDTHASIDE">
          
          <div class="chat-wrapper flex">
            members_info: <pre>{{ members_info }}</pre>
            dialogInfo: <pre>{{ dialogInfo }}</pre>
            <TextField height="68" :placeholder="'Написать @'+ chat.custom_name || dialogNames(dialogInfo)" postfix color="var(--system-back-color4)"/>
            
            <Chat/>
            
          </div>
        </Content>
        <RightAside :RightAside="WIDTHASIDE">
          chat: <pre>{{ chat }}</pre>
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
import TextField from '@/components/TextField.vue';
import Chat from '@/components/Chat.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

import { userComposable } from '@/composables/userComposable';
const {user, userToken} = userComposable()

import { dialogComposable } from '@/composables/dialogComposable';
const { dialogs, dialogNames, activeDialogID, setChat, getMembers_info, setActiveDialogID, members_info } = dialogComposable();


// icons
import { chatActions } from '@/assets/icons'

const WIDTHASIDE = 350;

const route = useRoute();
const store = useStore();
const chat = computed(() => store.getters['private_msg/getLoadedChat']) || [];

const dialogInfo = ref(null)
dialogInfo.value = computed(() => dialogs.value.filter(n => n.uuid == route.params?.id))

const aliases = ref([
  {
    id: 0,
    name: 'Васька',
    server: 'Мишкина каморка',
  },
])

const isHovered = ref(false);

function onMouseEnter() {
  isHovered.value = true;
}

function onMouseLeave() {
  isHovered.value = false;
}

async function loadChat() {
  console.log("loadChat")
  //console.log(activeDialogID.value != route.params?.id,  members_info.value == null)
  if (activeDialogID.value == route.params?.id && members_info.value != null) return;
  // Если совершен переход в другой диалог или актуального диалога нет
  //console.log("loadChat started")
  setActiveDialogID(route.params?.id); // Устанавливаем активный диалог
  setChat(route.params?.id) // Получаем инфо по нему - чат
  await getMembers_info(route.params?.id) // Загружаем в глобальную переменную members_info инфо о юзерах
  //console.log(members_info.value)
  console.log("loadChat end - выводится, потому что подгружал новый чат")
  
}

onMounted(()=> {
  if (!!user.value.id && userToken.value != null) // Если юзер загружен и токен актуален
    loadChat();
  
})

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
.chat-wrapper {
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
  padding: 0 10px 10px;
}
</style>