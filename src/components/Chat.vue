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
            <p class="message-author">{{ n.sender_info.nickname }}</p>
            <span class="emoji" v-if="n.emoji">{{ n.emoji }}</span>
            <span class="datetime">{{ formatDate(n.date_time) }}</span>
          </div>
          <div class="message flex" v-html="markdown.toHTML(n.message.text)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { formatDate } from '@/composables/generalFunctions';
import { markdown } from 'markdown';
import Avatar from './Avatar.vue';

const props = defineProps({
  messages: Object,
});
const emit = defineEmits(['scrolled']);
const isHovered = ref(false);
const scrollChat = ref(null);

// Функция для кастомизации скролла
function onMouseEnter() {
  isHovered.value = true;
};

// Функция для кастомизации скролла
function onMouseLeave() {
  isHovered.value = false;
};

// Подгрузка старых сообщений
async function handleScroll () {
  const container = scrollChat.value;
  if (!container) return; // Если не промотали до конца
  const threshold = 1; // погрешность в пикселях
  if (Math.abs(container.scrollTop) >= container.scrollHeight - container.clientHeight - threshold) { //Достигнут конец блока
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
          flex-direction: column;

          & > p {
            overflow-wrap: anywhere;
          }
          // Заголовки
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
            line-height: 1.25;
            
            &:first-child {
              margin-top: 0;
            }
          }

          h1 { font-size: 2em; }
          h2 { font-size: 1.5em; }
          h3 { font-size: 1.25em; }
          h4 { font-size: 1em; }
          h5 { font-size: 0.875em; }
          h6 { font-size: 0.85em; color: #6a737d; }

          // Параграфы
          p {
            margin-top: 0;
            margin-bottom: 1em;
            
            &:last-child {
              margin-bottom: 0;
            }
          }

          // Ссылки
          a {
            color: #0366d6;
            text-decoration: none;
            
            &:hover {
              text-decoration: underline;
            }
          }

          // Списки
          ul, ol {
            margin-top: 0;
            margin-bottom: 1em;
            padding-left: 2em;
            
            li {
              margin-bottom: 0.25em;
              
              &:last-child {
                margin-bottom: 0;
              }
              
              // Вложенные списки
              ul, ol {
                margin-top: 0.25em;
                margin-bottom: 0.25em;
              }
            }
          }

          // Код
          code {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.9em;
            padding: 0.2em 0.4em;
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 3px;
          }

          // Блоки кода
          pre {
            margin-top: 0;
            margin-bottom: 1em;
            padding: 1em;
            background-color: #f6f8fa;
            border-radius: 3px;
            overflow: auto;
            line-height: 1.45;
            
            code {
              background-color: transparent;
              padding: 0;
              font-size: 0.85em;
              color: #24292e;
              white-space: pre-wrap;
              word-break: break-word;
            }
          }

          // Цитаты
          blockquote {
            margin: 0 0 1em 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
            
            p {
              margin-bottom: 0.5em;
              
              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          // Горизонтальная линия
          hr {
            height: 0.25em;
            padding: 0;
            margin: 1.5em 0;
            background-color: #e1e4e8;
            border: 0;
          }

          // Таблицы
          table {
            display: block;
            width: 100%;
            overflow: auto;
            margin-bottom: 1em;
            border-collapse: collapse;
            border-spacing: 0;
            
            th {
              font-weight: 600;
              background-color: #f6f8fa;
            }
            
            th, td {
              padding: 6px 13px;
              border: 1px solid #dfe2e5;
            }
            
            tr {
              background-color: #fff;
              border-top: 1px solid #c6cbd1;
              
              &:nth-child(2n) {
                background-color: #f6f8fa;
              }
            }
          }

          // Изображения
          img {
            max-width: 100%;
            box-sizing: content-box;
            background-color: #fff;
            border-radius: 3px;
          }

          // Жирный и курсив
          strong {
            font-weight: 600;
          }
          
          em {
            font-style: italic;
          }

          // Встроенные элементы
          del {
            text-decoration: line-through;
          }

          // Подсветка синтаксиса для блоков кода (опционально)
          .hljs {
            background: transparent;
            padding: 0;
          }

          // Списки задач (task lists)
          .task-list-item {
            list-style-type: none;
            
            input[type="checkbox"] {
              margin: 0 0.2em 0.25em -1.6em;
              vertical-align: middle;
            }
          }
        }

        // Темная тема (опционально)
        .message.dark {
          color: #e1e4e8;
          background-color: #1e1e1e;
          
          h1, h2 {
            border-bottom-color: #3d444d;
          }
          
          h6 {
            color: #9da5b4;
          }
          
          a {
            color: #58a6ff;
          }
          
          code {
            background-color: rgba(240, 246, 252, 0.15);
          }
          
          pre {
            background-color: #2d2d2d;
            
            code {
              color: #e1e4e8;
            }
          }
          
          blockquote {
            color: #9da5b4;
            border-left-color: #3d444d;
          }
          
          hr {
            background-color: #3d444d;
          }
          
          table {
            th {
              background-color: #2d2d2d;
            }
            
            th, td {
              border-color: #3d444d;
            }
            
            tr {
              background-color: #1e1e1e;
              border-top-color: #3d444d;
              
              &:nth-child(2n) {
                background-color: #2d2d2d;
              }
            }
          }
          
          img {
            background-color: #1e1e1e;
          }
        }
      }
    }
  }
}

</style>