<template>Добавить друга
  <TextField
    @send="(message) => {name = message; sendRequest()}"
    placeholder="name или email"
  ></TextField>
  Ответ сервера:
  <pre>{{ req }}</pre>
</template>
<script setup>
import { useSocket } from '@/composables/useSocket';

import TextField from './TextField.vue';
import { ref } from 'vue';

const name = ref(null);
const req = ref(null);
const { socket } = useSocket({
  'users:getFriendshipRequests': onGetFSRequest,
  
  'error': onError,
  'notify': onNotify,
});

function sendRequest() {
  if (!name.value?.trim()) {
    return;
  }
  socket.emit('users:sendFriendshipRequest', name.value);

}

function onGetFSRequest(data) {
  console.log(data);
  req.value = data;
}

function onError(data) {
  console.error(data);
}

function onNotify(data) {
  console.error(data);
}

</script>