<template>
  <div class="add-friend-wrapper flex column">
    <h1 class="title">Добавить в друзья</h1>
    <p>Вы можете добавить друзей по имени пользователя или электронной почте</p>
    <TextField
      @send="(message) => {name = message; sendRequest()}"
      placeholder="Имя пользователя или электронная почта"
      button
      
      :border="error ? 'var(--muted-notification-color)' : (req ? 'var(--light-green-color)' : null)"
    >
      <template v-slot:button>Отправить запрос дружбы</template>
    </TextField>
    <Hint 
      show="req"
      :text="req || ''"
      :color="error ? 'var(--muted-notification-color)' : 'var(--light-green-color)'"
    />
    
    <Divider h width="100" color="var(--system-back-color5)"/>
    <h2>Где еще можно завести друзей</h2>
    <p>Нет знакомых пользователей? Тогда посмотрите наш список открытых серверов,
      где найдётся всй, от игр до кулинарии, музыки, аниме и многого другого.
    </p>
    <button @click="Discovery()" class="discovery flex row">
      <span class="name-button flex row">
        <span class="button-icon">
          <Icon name="discovery"/>
        </span>
        
        Исследуйте доступные серверы
      </span>
      
      <Icon name="arrow_right"/>
    </button>
  </div>
</template>
<script setup>
import { useSocket } from '@/composables/useSocket';
import { ref } from 'vue';

import TextField from './TextField.vue';
import Hint from './Hint.vue';
import Divider from './Divider.vue';
import Icon from './Icon.vue';

const name = ref(null);
const req = ref(null);
const error = ref(null);
const { socket } = useSocket({
  'error': onError,
  'notify': onNotify,
});

function sendRequest() {
  if (!name.value?.trim()) {
    return;
  }
  socket.emit('users:sendFriendshipRequest', name.value);

}


function onError(data) {
  error.value = true;
  switch (data) {
    case 'FRIENDSHIP_ERROR_DUPLICATE_REQUEST':
      req.value = 'Запрос на дружбу уже существует';
      break;
    case 'FRIENDSHIP_ERROR_USER_NOT_FOUND':
      req.value = 'Указанный пользователь не найден';
      break;
    case 'FRIENDSHIP_ERROR_SELF_REQUEST':
      req.value = 'Вы не можете добавить себя в друзья';
      break;
    case 'FRIENDSHIP_ERROR_BLOCK_REQUEST':
      req.value = 'Пользователь ' + name.value + 
      ' не принимает запросы в друзья. Ему нужно добавить вас, чтобы вы стали друзьями.';
  }
}

function onNotify(data) {
  error.value = false;
  switch (data) {
    case 'FRIENDSHIP_OK':
      req.value = 'Запрос успешно отправлен';
      break;
  }
}

function Discovery() {
  alert("Путешествие начинается")
}

</script>
<style lang="scss">
.add-friend-wrapper {
  row-gap: 5px;
  padding: 17px;
  h1, h2 {
    color: var(--loud-text-color);
    font-family: var(--font-family-300);
    font-size: 20px;
    letter-spacing: .7px;
  }
  h2 {
    margin-top: 10px;
  }

  p {
    color: var(--main-text-color);
    font-family: var(--font-family-400);
    font-size: 15px;
  }

  .discovery {
    width: 50%;
    background-color: transparent;
    border: 1px solid var(--system-back-color5);
    margin-top: 10px;
    padding: 10px;
    justify-content: space-between;
    color: var(--main-text-color);
    font-family: var(--font-family-500);
    font-size: 16px;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    transition: .3s background-color;

    &:hover {
      background-color: var(--system-back-color1);
    }

    .name-button {
      align-items: center;
      column-gap: 8px;

      .button-icon {
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #429B63;
        border-radius: 8px;
      }

    }
  }
}
.hint {
  margin-top: 7px;
}
</style>