<template>
  <TransitionGroup name="fade" class="navbar" tag="div">
    <div class="private-messages" :key="currentBlock">
      <div class="home-link">
        <router-link to="/messages" :class="(activeServer > 0) ? null : 'active'" class="home" @mouseenter="hover = -1"
          @mouseleave="hover = null"></router-link>
        <div class="tooltip right" v-if="hover == -1">Личные сообщения</div>
      </div>

      <div class="h-divider divider"></div>

      <div class="messages" v-for="(m, i) in messages">
        <div class="message" @mouseenter="hover = 'm' + i" @mouseleave="hover = null">
          <router-link :class="(m.missed_messages && m.missed_messages > 0) ? 'missed-messages' : null"
            :to="'/messages/' + m.id" class="link-message">
            <img :src="m.avatar" alt="">
            <div class="mentions" v-if="m.missed_messages && m.missed_messages > 0">{{ m.missed_messages }}</div>
          </router-link>
          <div class="tooltip right" v-if="hover == 'm' + i">{{ m.name }}</div>
        </div>
      </div>
    </div>

    <div :key="currentBlock" class="h-divider divider" v-if="messages && messages.length"></div>

    <div :key="currentBlock" class="servers" v-for="(s, i) in servers">
      <div class="server" @mouseenter="hover = 's' + i" @mouseleave="hover = null">
        <router-link
          :class="{ 'missed-messages': s.missed_messages && s.missed_messages > 0, 'active': activeServer == s.id }"
          :to="'/server/' + s.id" class="link-server">
          <img :src="s.avatar" alt="">
          <div class="mentions" v-if="s.mentions && s.mentions > 0">{{ s.mentions }}</div>
        </router-link>
        <div class="tooltip right" v-if="hover == 's' + i">{{ s.name }}</div>
      </div>
    </div>
    <div :key="currentBlock" class="h-divider divider"></div>

    <div :key="currentBlock" class="actions" v-for="(a, i) in actions">
      <div @click="a.handler" class="link-action">
        <img :src="a.avatar" alt="" @mouseenter="hover = i" @mouseleave="hover = null">
      </div>
      <div class="tooltip right" v-if="hover == i">{{ a.name }}</div>
    </div>
    {{ activeServer }}
  </TransitionGroup>
</template>
<script setup>
import router from '@/router'
import { ref, reactive, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const activeServer = ref(0) // Начальное значение - сервер не выбран
const currentBlock = ref(1) // Для плавной анимации исчезновения диалога
const hover = ref(1) // Для видимости наведенного блока
const actions = reactive([
  {
    id: 1,
    name: "Добавить сервер",
    link: '/add-server',
    handler: () => {
      alert("add server")
    },
    avatar: require('@/assets/img/Plus.svg'),
  },
  {
    id: 2,
    name: "Путешествие",
    link: '/discovery',
    handler: () => {
      router.push({ name: 'discovery' })
    },
    avatar: require('@/assets/img/Discovery.svg'),
  },
])
const servers = reactive([
  {
    id: 1,
    name: "Test",
    missed_messages: 71,
    last_message: "2025-21-04 15:20:03",
    avatar: require('@/assets/img/Server Icon.jpg'),
    mentions: 1,
  },
  {
    id: 2,
    name: "Nice cats",
    missed_messages: 1,
    last_message: "2025-21-03 08:09:10",
    avatar: require('@/assets/img/Server Icon1.jpg'),
  },
  {
    id: 3,
    name: "Help yourself",
    /* missed_messages: 1003, */
    last_message: "2025-10-03 21:30:15",
    avatar: require('@/assets/img/Server Icon2.jpg'),
  },
]);
let messages = reactive([
  {
    id: 101, // userId
    name: "Анна Шатова",
    missed_messages: 1,
    last_message: "2025-21-03 10:08:15",
    avatar: require('@/assets/img/User Icon.jpg'),
  },
  {
    id: 2,
    name: "Михаил Шатов",
    missed_messages: 2,
    last_message: "2025-21-03 15:03:15",
    avatar: require('@/assets/img/User Icon1.jpg'),
  },
  {
    id: 35,
    name: "Василий Николаев",
    missed_messages: 5,
    last_message: "2025-21-03 15:03:16",
    avatar: require('@/assets/img/User Icon2.jpg'),
  }
])
const route = useRoute()
const goToMessage = (id) => { // Для перехода в ЛС
  let index = messages.findIndex(e => e.id == id);
  activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  if (index > -1) messages.splice(index, 1) // Удаление из Навбара

}
const goToServer = (id) => {
  activeServer.value = id // Сервер выбран

}
watchEffect(() => {
  //console.log('Полный route объект:', route)
  if (route.name == 'message') goToMessage(route.params.id) // Выбран диалог
  else if (route.name == 'server') goToServer(route.params.id) // Выбран сервер
  else if (route.name == 'messages') {
    activeServer.value = 0 // Очищение значения - сервер не выбран, домашняя страница
  }
  hover.value = null // Очищение тултипов
})
</script>
<style lang="scss">
.navbar {
  background-color: var(--system-back-color5);
  width: 68px;
  height: 100%;
  padding-inline: 10px;
  /* overflow: auto; */
  scrollbar-width: none;

  a {
    &.missed-messages {
      &::before {
        height: 8px;
        left: -10px;
      }
    }

    &.active {
      &::before {
        height: 95.2% !important;
        left: -10px;
      }
    }

    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 0;
      background: #fff;
      border-radius: 0 4px 4px 0;
      top: 50%;
      left: -20px;
      transform: translate(0%, -50%);
      transition: height 0.3s ease, left 0.3s ease;
    }

    &:hover::before {
      height: 19px;
      left: -10px;
    }
  }

  .mentions {
    color: white;
    font-family: var(--font-family-600);
    font-size: 13px;
    line-height: 109%;
    letter-spacing: -0.01em;
    background-color: var(--notification-color);
    width: auto;
    height: 16px;
    position: absolute;
    border-radius: 8px;
    padding: 0px 5px;
    outline: 3px solid var(--system-back-color5);
    display: flex;
    align-items: center;
    right: 0;
    bottom: 0;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .divider.h-divider {
    margin-block: 8px;
  }

  a.home,
  a.link-server {
    display: flex;
    border-radius: 13px;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .home {
    background-color: var(--system-back-color2);
    background-image: url(@/assets/img/Main-icon.svg);
    background-repeat: no-repeat;
    background-position: center center;

    &:hover,
    &.active {
      background-color: var(--system-purple-color);
    }

  }

  .home-link,
  .message,
  .server,
  .link-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block-end: 8px;
    position: relative;
  }

  .messages {
    .message {
      a.link-message {
        display: flex;
        width: 100%;
        aspect-ratio: 1/1;
        background-color: var(--system-back-color1);
        border-radius: 30px;
        overflow: hidden;
      }
    }
  }

  .servers {
    .server {
      a.link-server {
        background-color: var(--link-color);
        overflow: hidden;
      }
    }
  }

  .actions {
    position: relative;
    display: flex;
    flex-direction: row;

    .link-action {
      object-fit: cover;
      border-radius: 13px;
      width: 100%;
      aspect-ratio: 1 / 1;
      justify-content: center;
      background-color: var(--system-back-color2);
      border-radius: 30px;

      &:first-of-type {
        cursor: pointer;
      }

      &::before {
        display: none;
      }

      &:hover {
        background-color: var(--system-purple-color);
      }

      img {
        width: auto;
        aspect-ratio: 1 / 1;
        height: auto;
      }
    }
  }
}
</style>