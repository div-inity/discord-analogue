<template>
  <div class="chat flex">
    <div class="chat-item flex row"  v-for="n of props.messages" :key="n.id">
      <Avatar 
        size="45" 
        :avatar="n.avatar || null"
      />
      <div class="message-item flex column">
        <div class="messages-info flex row">
          <p class="message-author">{{ getAuthor(n.sender_id) }}</p>
          <span class="emoji" v-if="n.emoji">{{ n.emoji }}</span>
          <span class="datetime">{{ formatDate(n.date_time) }}</span>
        </div>
        <div class="message flex">
          <p>{{ n.message.text }}</p>
        </div>
      </div>
      
    </div>
    
  </div>
</template>
<script setup>
import { formatDate } from '@/composables/generalFunctions';

import { dialogComposable } from '@/composables/dialogComposable';
const { dialogs, dialogNames, activeDialogID, setChat, setActiveDialogID, members_info } = dialogComposable();
import Avatar from './Avatar.vue';
const props = defineProps({
  messages: Object,
})

const getAuthor = (id) => {
  return members_info?.value?.find(e => e.id == id)?.nickname;
}

</script>
<style lang="scss">
.chat {
  height: calc(100% - 68px);
  row-gap: 20px;
  justify-content: flex-start;
  flex-direction: column-reverse;
  padding-inline: 7px;

  .chat-item {
    column-gap: 15px;

    .message-item {
      .messages-info {
        align-items: flex-end;
        column-gap: 10px;

        .message-author {
          font-family: var(--font-family-500);
          color: var(--loud-text-color);
          font-size: 16px;
        }
        .emoji {

        }
        .datetime {
          font-family: var(--font-family-400);
          color: var(--muted-text-color);
          font-size: 12px;
        }
      }
      
      .message {
        font-family: var(--font-family-400);
        color: var(--main-text-color);
        font-size: 15px;
        flex-direction: column-reverse;
      }
    }
  }
}
</style>