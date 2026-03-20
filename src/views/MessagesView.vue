<template>
  <div class="messages-wrapper flex row">
    <Sidebar></Sidebar>
    <div class="content-wrapper flex column">
      <ContentHeader>
        <template v-slot:page-title v-if="route.params?.id">
          <template v-if="members_info?.length > 2">
            <!-- Мульти-аватар -->
            <Avatar :status="null" size="30"  multy :avatars="null"
            outline="var(--system-back-color2)"></Avatar>

            <!-- Мульти-имя -->
            <div class="dialog-name-multy dialog-name">
              <span v-tippy="{ content: 'Редактировать группу', placement: 'bottom'}">
                {{ dNames }}
              </span>
            </div>
          </template>
          
          <template v-else-if="members_info?.length <= 2">
            <!-- Сингл-аватар -->
            <Avatar 
              size="30"
              :status="null"
              :avatar="null"
            ></Avatar>

            <!-- Сингл-имя -->
            <div 
              class="dialog-name-single dialog-name" 
              v-tippy="{ content: `@${dialogNames(members_info, 'name')}`, placement: 'bottom'}"
            >
              {{ dNames }}
            </div>
          </template>
        </template>
      </ContentHeader>
      <ContentFlex>
        <Content :RightAside="WIDTHASIDE">
          <Chat 
            v-if="chat?.length"
            :messages="chat" 
            @scrolled="loadmessages()"/>
          <TextField 
            height="62" 
            :placeholder="'Написать '+ dNames" 
            color="var(--system-back-color4)"
            @send="(message) => {newMessage = message; sendMessage()}"
            multyline
            padding="13px 12px"
          >
            <template v-slot:prefix>
              <button><span v-html="textFieldIcons.add" class="icon"></span></button>
            </template>
            <template v-slot:postfix>
              <button><span v-html="textFieldIcons.gif" class="icon"></span></button>
              <button><span v-html="textFieldIcons.sticker" class="icon"></span></button>
              <button><span v-html="textFieldIcons.emoji" class="icon"></span></button>
              <button><span v-html="textFieldIcons.apps" class="icon"></span></button>
            </template>
          </TextField>
        </Content>
        <RightAside :RightAside="WIDTHASIDE">
        </RightAside>
      </ContentFlex>
    </div>
  </div>

</template>
<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, onBeforeUnmount, watch } from 'vue';

import { dialogComposable } from '@/composables/dialogComposable';

import Sidebar from '@/components/Sidebar.vue'
import ContentHeader from '@/components/ContentHeader.vue';
import ContentFlex from '@/components/ContentFlex.vue';
import Content from '@/components/Content.vue';
import RightAside from '@/components/RightAside.vue';
import Avatar from '@/components/Avatar.vue';
import TextField from '@/components/TextField.vue';
import Chat from '@/components/Chat.vue';

import { chatActionsIcons, textFieldIcons } from '@/assets/icons'

import { useSocket } from '@/composables/useSocket';

const { getDialogFieldByID, dialogNames, activeDialogID, setActiveDialogID, members_info } = dialogComposable();
const newMessage = ref('');

const { socket } = useSocket({
  'chat:message': onMessage,
});

const WIDTHASIDE = 350;

const route = useRoute();
const dNames = ref(null); // Название диалога
const chat = ref([]); // Хранит сообщения

function onMessage(msg) {// Выполняется при отправке сообщения
  if (msg.unshift) chat.value = [msg.unshift, ...chat.value];
  if (msg.push) chat.value = [...chat.value, ...msg.push];
};

function sendMessage() {
  if (!newMessage.value?.trim()) {
    return;
  }
  const msg = {
    message: newMessage.value,
    dialog: activeDialogID.value,
  };
  socket.emit('chat:message', msg);
  newMessage.value = '';
};

async function loadChat() { // Смена диалога
  if (!activeDialogID.value || members_info.value != null) {
    setActiveDialogID(route.params?.id); // Устанавливаем активный диалог
  }
  // Присоединяемся к комнате диалога
  socket.emit('chat:join', activeDialogID.value);

  chat.value = [];

  socket.emit('chat:load', {
    dialog_id: route.params?.id,
    offset: 0,
  });

  // Если совершен переход в другой диалог или актуального диалога нет
  await getDialogFieldByID(route.params?.id, 'members_info') // Загружаем в глобальную переменную members_info инфо о юзерах
  const custom_name = await getDialogFieldByID(route.params?.id, "custom_name");
  dNames.value = (custom_name.value.length) ? custom_name.value : dialogNames(members_info.value);
};

function loadmessages() { // Подгрузка старых сообщений
  console.log("chat", chat.value)
  const payload = {
    dialog_id: activeDialogID.value,
    offset: chat.value?.length,
  }
  socket.emit('chat:load', payload);
};

onBeforeUnmount(() => {
  socket.emit('chat:leave', activeDialogID.value);
});

watch(
  () => route.params.id,
  (id, oldid) => {
    if (id != oldid) {
      socket.emit('chat:leave', oldid);
      loadChat();
    }
  },
  { immediate: true }
);

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
}

.input-wrapper .postfix button .icon {
  height: 20px;
  width: 20px;
}
</style>