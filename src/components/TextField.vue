<template>
  <template v-if="!props.multyline">
    <div 
      class="input-wrapper flex row" 
      :style="{
      height: props.height ? props.height + 'px' : null,
      width: props.width ? props.width + '%' : null,
      'border-radius': props.radius ? props.radius + 'px' : '8px',
      padding: props.padding ? props.padding + 'px' : '0 12px',
      'background-color': props.color ? props.color : 'var(--system-back-color5)',
      'border-color': props.border ? props.border : 'var(--system-back-color1)'
    }">
      <!-- <span class="icon" v-html="mainIcons.search" v-if="props.icon == 'search'"></span> -->
      <div class="prefix flex row">
        <slot name="prefix"></slot>
      </div>
      <input 
        type="text" 
        :placeholder="props.placeholder || 'Поиск'" 
        name="input" 
        autocomplete="off"
        v-model="message" 
        @keyup.enter="toSend()">
      <slot name="actions"></slot>
      <button v-if="props.icon == 'search' && props.button == true">
        <slot name="button">Поиск</slot>
      </button>
      <div class="postfix flex row">
        <slot name="postfix">
        </slot>
      </div>
    </div>
  </template>
  <template v-else>
    <div 
      class="input-wrapper flex row multiline" 
      :style="{
      /* height: props.height ? props.height + 'px' : null, */
      width: props.width ? props.width + '%' : null,
      'border-radius': props.radius ? props.radius + 'px' : '8px',
      /* padding: props.padding ? props.padding + 'px' : '0 12px', */
      'background-color': props.color ? props.color : 'var(--system-back-color5)',
      'border-color': props.border ? props.border : 'var(--system-back-color1)',
      height: updateHeightTextarea() + 24 + 'px'
    }">
      <div class="prefix flex row">
        <slot name="prefix"></slot>
      </div>
      <textarea
        :placeholder="props.placeholder || 'Поиск'" 
        name="input" 
        autocomplete="off"
        v-model="message" 
        @keydown.enter="handleEnterKey"
        @input="updateLineCount"
        ref="textareaRef"
        :style="{height: updateHeightTextarea() + 'px'}"
      ></textarea>{{ lineCount }}
      <slot name="actions"></slot>
      <button v-if="props.icon == 'search' && props.button == true">
        <slot name="button">Поиск</slot>
      </button>
      <div class="postfix flex row">
        <slot name="postfix">
        </slot>
      </div>
    </div>
  </template>
</template>
<script setup>
import { mainIcons } from '@/assets/icons'
import { ref, watch, nextTick } from 'vue';
const emit = defineEmits(['send'])
const props = defineProps({
  //prefix: Boolean,
  //postfix: Boolean,
  icon: String,
  height: String,
  width: String,
  radius: String,
  button: Boolean,
  placeholder: String,
  color: String,
  border: String,
  multyline: Boolean,
  padding: String,
});
const message = ref(null); // Тело инпута
function toSend() { // Отправить тело инпута
  emit('send', message.value);
  message.value = null;
}

const lineCount = ref(0);
const textareaRef = ref(null);
const lineHeight = 21; // фактическая высота строки в textarea

function updateLineCount() {
  nextTick(() => {
    if (textareaRef.value) {
      const el = textareaRef.value;
      const scrollHeight = el.scrollHeight;
      // Количество строк --- это высота текста, деленная на высоту одной строки
      lineCount.value = Math.ceil(scrollHeight / lineHeight); // 1 - подсчитанная погрешность
    }
  });
}
function updateHeightTextarea() {
  /* let t = 58
  if (lineCount.value < 2) return (lineCount.value) * lineHeight; */
  return (lineCount.value) * (lineHeight) || lineHeight;
}

// Можно также автоматически обновлять при изменении текста
watch(message, () => {
  updateLineCount();
});

const handleEnterKey = (e) => {
  console.log(e)
  //return
  if (e.shiftKey) { // Если Shift+Enter - возврат. Текстареа сама вставляет перенос
    return;
  }
  e.preventDefault() // Иначе предотвращаем переход на новую строку
  toSend(); // простая отправка сообщения родителю
}
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* border-radius: 8px; */
  width: 100%;
  min-width: 250px;
  height: 55px;
  min-height: 55px;
  padding: 12px;
  column-gap: 12px;
  font-family: var(--font-family-400);
  border: 1px solid;
  

  &.multiline {

    textarea {
      border: none;
      resize: none;
      outline: none;
      line-height: 20px;
      overflow-y: auto;

  
      flex-grow: 2;
      font-size: 15px;
      background-color: transparent;
      font-family: var(--font-family-400);

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    .prefix, .postfix {
      align-items: flex-start;
    }
  }

  /* &:focus-within {
    outline: 1px solid var(--link-color);
  } */

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 20px;
    height: 20px;

    svg {}
  }

  .prefix, .postfix {
    height: 100%;
    column-gap: 8px;
    align-items: center
  }

  input {
    flex-grow: 2;
    font-size: 15px;
    height: 100%;
    background-color: transparent;
    font-family: var(--font-family-400);
    padding-block: 13px;

    &::placeholder {
      color: var(--icon-color);
    }
  }
  

  button {
    cursor: pointer;
    height: 30px;
    width: 30px;
    padding-inline: 10px;
    /* background-color: var(--system-purple-color); */
    background-color: transparent;
    color: var(--loud-text-color);
    /* filter: brightness(.9); */
    font-size: 14px;
    transition: .3s background-color;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    &:hover {
      filter: none;
      background-color: var(--system-back-color1);
      svg * {
        fill: white;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      width: inherit;
      height: inherit;

      svg *{
        transition: .3s fill;
      }
    }
  }
}

@media screen and (max-width: 725px) {
  .input-wrapper {
    column-gap: 4px;
  }
}
</style>