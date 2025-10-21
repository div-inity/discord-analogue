<template>
  <div class="navbar">
    <div class="private-messages">
      <div class="home-link">
        <router-link to="/messages" class="home" @mouseenter="hover = -1" @mouseleave="hover = null"></router-link>
        <div class="tooltip right" v-if="hover == -1">Личные сообщения</div>
      </div>

      <div class="h-divider divider"></div>
      <div class="messages" v-for="(m, i) in messages">
        <div class="message" @mouseenter="hover = 'm' + i" @mouseleave="hover = null">
          <router-link :to="'/messages/' + m.id" class="link-message">
            <img :src="m.avatar" alt="">
            <div class="mentions" v-if="m.mentions && m.mentions > 0">{{ m.mentions }}</div>
          </router-link>
          <div class="tooltip right" v-if="hover == 'm' + i">{{ m.name }}</div>
        </div>
      </div>
    </div>

    <div class="h-divider divider"></div>
    <div class="servers" v-for="(s, i) in servers">
      <div class="server" @mouseenter="hover = 's' + i" @mouseleave="hover = null">
        <router-link :to="'/server/' + s.id" class="link-server">
          <img :src="s.avatar" alt="">
          <div class="mentions" v-if="s.mentions && s.mentions > 0">{{ s.mentions }}</div>
        </router-link>
        <div class="tooltip right" v-if="hover == 's' + i">{{ s.name }}</div>
      </div>
    </div>
    <div class="h-divider divider"></div>
    <div class="actions" v-for="(a, i) in actions">
      <router-link :to="a.link" class="link-action">
        <img :src="a.avatar" alt="" @mouseenter="hover = i" @mouseleave="hover = null">
      </router-link>
      <div class="tooltip right" v-if="hover == i">{{ a.name }}</div>
    </div>
    {{ hover }}
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const hover = ref(null)
const actions = reactive([
  {
    id: 1,
    name: "Добавить сервер",
    link: '/add-server',
    avatar: require('@/assets/img/Plus.svg'),
  },
  {
    id: 2,
    name: "Путешествие",
    link: '/discovery',
    avatar: require('@/assets/img/Discovery.svg'),
  },
])
const servers = reactive([
  {
    id: 1,
    name: "Test",
    notifies: 71,
    last_message: "2025-21-04 15:20:03",
    avatar: require('@/assets/img/Server Icon.jpg'),
    mentions: 1,
  },
  {
    id: 2,
    name: "Nice cats",
    notifies: 15,
    last_message: "2025-21-03 08:09:10",
    avatar: require('@/assets/img/Server Icon1.jpg'),
  },
  {
    id: 3,
    name: "Help yourself",
    notifies: 1003,
    last_message: "2025-10-03 21:30:15",
    avatar: require('@/assets/img/Server Icon2.jpg'),
  },
]);
const messages = reactive([
  {
    id: 1,
    name: "Анна Шатова",
    notifies: 1,
    last_message: "2025-21-03 10:08:15",
    avatar: require('@/assets/img/User Icon.jpg'),
    mentions: 1500,
  },
  {
    id: 2,
    name: "Михаил Шатов",
    notifies: 2,
    last_message: "2025-21-03 15:03:15",
    avatar: require('@/assets/img/User Icon1.jpg'),
    mentions: 20,
  },
  {
    id: 2,
    name: "Василий Николаев",
    notifies: 5,
    last_message: "2025-21-03 15:03:16",
    avatar: require('@/assets/img/User Icon2.jpg'),
  }
])
</script>
<style lang="scss">
.navbar {
  background-color: var(--system-back-color5);
  width: 68px;
  height: 100%;
  padding-inline: 10px;
  /* overflow: auto; */
  scrollbar-width: none;

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
    background-color: var(--system-purple-color);
    background-image: url(@/assets/img/Main-icon.svg);
    background-repeat: no-repeat;
    background-position: center center;
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