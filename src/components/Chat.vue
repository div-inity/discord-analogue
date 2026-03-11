<template>
  <div class="chat-wrapper flex" 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave" 
    :class="{ hovered: isHovered }"
    ref="scrollChat">
    <div class="chat flex">
      <div v-for="(n, i) of props.messages" class="chat-item flex row" :class="{first: i == props.messages.length - 1, last: i == 0}" :key="n.id">
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
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { formatDate } from '@/composables/generalFunctions';

import { dialogComposable } from '@/composables/dialogComposable';
const { members_info } = dialogComposable();
import Avatar from './Avatar.vue';
const props = defineProps({
  messages: Object,
})
const emit = defineEmits(['scrolled']);
const getAuthor = (id) => {
  return members_info?.value?.find(e => e.id == id)?.nickname;
}

const isHovered = ref(false);

function onMouseEnter() {
  isHovered.value = true;
}

function onMouseLeave() {
  isHovered.value = false;
}

const scrollChat = ref(null)
const handleScroll = async() => {
  const container = scrollChat.value;
  if (!container) return; // Если не промотали до конца
  const threshold = 1; // погрешность в пикселях
  if (Math.abs(container.scrollTop) >= container.scrollHeight - container.clientHeight - threshold) {
    //console.log('Достигнут конец блока!');
    const previousScrollTop = container.scrollTop; // Запоминаем текущую высоту
    emit('scrolled'); // Подгружаем сообщения
    await nextTick(); // Обновление DOM
    container.scrollTop = previousScrollTop; // Присваиваем высоту
    return;
  }
};

onMounted(() => {
  if (scrollChat.value) {
    scrollChat.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (scrollChat.value) {
    scrollChat.value.removeEventListener('scroll', handleScroll);
  }
});

</script>
<style lang="scss">
.chat-wrapper {
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
  /* padding: 0 10px 10px; */
  row-gap: 30px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Target the scrollbar track (the background) */
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  /* Target the scrollbar thumb (the draggable handle) */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: transparent;
  }

  /* Меняем стиль при наведении на весь контейнер */
  &.hovered::-webkit-scrollbar-thumb {
    background: var(--system-back-color3);
  }

  .chat {
    height: 100%;
    row-gap: 20px;
    justify-content: flex-start;
    flex-direction: column-reverse;
    padding-inline: 7px;
  

    .chat-item {
      column-gap: 15px;

      &.first {
        padding-top: 20px;
      }

      &.last {
        padding-bottom: 20px;
      }

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

          p {
            overflow-wrap: anywhere;
          }
        }
      }
    }
  }
}

</style>