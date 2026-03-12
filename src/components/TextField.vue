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
      :style="wrapperStyles">
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
        @cut="updateTextareaHeight" 
        @paste="handlePaste"        
        ref="textareaRef"
        :style="{height: textareaHeight + 'px'}"
      ></textarea>
      <slot name="actions"></slot>
      <button v-if="props.icon == 'search' && props.button == true">
        <slot name="button">Поиск</slot>
      </button>
      <div class="postfix flex row">
        <slot name="postfix"></slot>
      </div>
    </div>
  </template>
</template>
<script setup>
import { mainIcons } from '@/assets/icons'
import { ref, watch, nextTick, computed, onMounted   } from 'vue';
import { generalFunctions } from '@/composables/generalFunctions';
const {contentHeight} = generalFunctions();
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
  minHeight: {
    type: Number,
    default: 20
  },
  maxHeight: {
    type: Number,
    default: 30  // Максимальная высота, после которой появляется скролл
  }
});
const message = ref(null); // Тело инпута
function toSend() { // Отправить тело инпута
  emit('send', message.value);
  message.value = null;
}

const handleEnterKey = (event) => {
  if (event.shiftKey) {
    // Shift + Enter: разрешаем перенос строки
    nextTick(() => {
      updateTextareaHeight()
    })
    return
  } else {
    // Обычный Enter: отправляем
    event.preventDefault()
    if (message.value && message.value.trim()) {
      toSend()
    }
  }
}

const textareaRef = ref(null)
const textareaHeight = ref(props.minHeight)
const wrapperStyles = computed(() => ({
  width: props.width ? props.width + '%' : null,
  'border-radius': props.radius ? props.radius + 'px' : '8px',
  'background-color': props.color ? props.color : 'var(--system-back-color5)',
  'border-color': props.border ? props.border : 'var(--system-back-color1)',
  height: textareaHeight.value * 1.5 + 'px'
}))

function updateTextareaHeight(){
  if (textareaRef.value) {
    // Сбрасываем высоту до минимальной
    textareaRef.value.style.height = props.minHeight + 'px'
    
    // Получаем реальную высоту контента
    let newHeight = textareaRef.value.scrollHeight
    
    // Применяем ограничения
    newHeight = Math.max(props.minHeight, newHeight)
    const max = contentHeight.value / 100 * props.maxHeight;
    if (props.maxHeight) {
      //console.log(max)
      newHeight = Math.min(max, newHeight)
      //console.log(newHeight)
    }
    
    // Устанавливаем новую высоту
    textareaHeight.value = newHeight
    textareaRef.value.style.height = newHeight + 'px'
    
    // Включаем/выключаем скролл в зависимости от высоты
    if (max && newHeight >= max) {
      textareaRef.value.style.overflowY = 'auto'
    } else {
      textareaRef.value.style.overflowY = 'hidden'
    }
  }
}

const handlePaste = (event) => {
  // Даем время на вставку текста, потом обновляем высоту
  nextTick(() => {
    updateTextareaHeight()
  })
}

const updateLineCount = () => {
  // Обновляем высоту при вводе
  nextTick(() => {
    updateTextareaHeight()
  })
}

// Следим за изменениями message
watch(message, () => {
  nextTick(() => {
    updateTextareaHeight()
  })
})

// Инициализация
onMounted(() => {
  updateTextareaHeight()
})
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* border-radius: 8px; */
  width: 100%;
  min-width: 250px;
  /* height: auto; */
  min-height: 58px;
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