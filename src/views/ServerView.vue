<template>
  <Sidebar :headerHeight="(server?.boostLevel > 0 && server?.banner) ? '150px' : null">
    <template v-slot:header>
      <div class="banner" v-if="server?.boostLevel > 0 && server?.banner">
        <img :src="server?.banner" alt="">
      </div>
      <div 
        class="header-actions flex row" 
        :class="{boosted: server?.boostLevel > 0}"
        :style="{
          width: sidebarWidth + 'px', 
          top: mainHeaderHeight + 'px',
          height: headerHeight + 'px',
        }"
      >
        <button 
          class="server-name flex row" 
          :class="{clicked: serverNameClicked}"
          @click="serverNameClick">
          <Icon :name="server?.icon" size="18"/>
          {{ server?.name }}
          <Icon name="arrow_down" size="18" class="arrow"/>
        </button>
        <button class="invite">
          <Icon name="addFriend" size="18" />
        </button>
      </div>
    </template>
    <template v-slot:other>
      <div class="server-info flex column">
        <button v-for="s in server_info" class="flex row">
          <Icon :name="s.icon" size="18"/>
          {{ s.name }}
        </button>
      </div>

      <Divider h width="100" color="var(--system-back-color1)"/>

      <div class="categories flex column" v-for="c in server?.categories">
        <p class="category">{{ c.name }}</p>
        <div class="channels flex column" v-for="chs in c.channels">
          <button class="channel flex row">
            <Icon :name="channelIcons[chs.type]" size="18"/>
            {{ chs.name }}
          </button>
        </div>
        <!-- <div class="channel" v-for="ch in c">
          <pre>{{ ch }}</pre>
          </div> -->
      </div>
    </template>
  </Sidebar>
  <router-view />serverview
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Icon from '@/components/Icon.vue';
import Divider from '@/components/Divider.vue';

import { generalFunctions } from '@/composables/generalFunctions';
import { computed, ref, watch } from 'vue';
import store from '@/store';
import { useRoute } from 'vue-router';
const route = useRoute();
const {sidebarWidth, mainHeaderHeight, headerHeight} = generalFunctions();
const server = ref(null);
const serverNameClicked = ref(false);
const server_info = [
  {
    name: '1 событие',
    rights: 5,
    icon: 'calendar',
    handler: () => {

    }
  },
  {
    name: 'Просмотр каналов',
    rights: 0,
    icon: 'view_list',
    handler: () => {
      
    }
  },
  {
    name: 'Участники',
    rights: 5,
    icon: 'hideProfile',
    handler: () => {
      
    }
  },
  {
    name: 'Бусты сервера',
    rights: 5,
    icon: 'boost',
    handler: () => {
      
    }
  },
]
const channelIcons = {
  text: 'channel_text',
  rules: 'channel_rules',
  announcements: 'channel_announcements',
  forum: 'channel_forum',
  voice: 'call',
  private: 'channel_locked',
}


function serverNameClick () {
  serverNameClicked.value = !serverNameClicked.value;
}


watch(
  () => route.params.id,
  (id, oldid) => {
    if (id != oldid) {
      server.value = computed(() => store.getters['servers/getServer'](Number(id))).value;
      serverNameClicked.value = false;
      console.log(server.value);
    }
  },
  { immediate: true }
);
</script>
<style lang="scss">
.sidebar-header {
  justify-content: center;
  position: relative;

  .banner {
    width: 100%;
    height: 150px;
    background-size: cover;
    position: absolute;
    top: 0;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .header-actions {
    justify-content: space-between;
    position: fixed;
    z-index: 10;
    padding-inline: 10px;
    align-items: center;
    border-radius: 5px 0 0 0;
    overflow: hidden;

    &.boosted {
    transition: backdrop-filter .3s;
    background: -webkit-linear-gradient(0deg, rgb(0, 0, 0, 0), rgb(0, 0, 0, .6));
    background: -moz-linear-gradient(0deg, rgb(0, 0, 0, 0), rgb(0, 0, 0, .6));
    background: linear-gradient(0deg, rgb(0, 0, 0, 0), rgb(0, 0, 0, .6));

      &:hover {
        backdrop-filter: blur(10px); /* Размытие заднего фона */
        box-shadow: inset 0 -1px 0px 0px rgba(255, 255, 255, .06);
      }

      button {

        &:hover{
          backdrop-filter: blur(1px); 
          background-color: transparent;
        }
      }
    }

    button {
      background-color: transparent;
      border-radius: 8px;
      transition: background-color .3s;

      &:hover {
        background-color: var(--system-back-color1);

        svg path {
          fill: var(--main-text-color);
        }
      }
    }
    .server-name {
      padding-inline: 8px;
      align-items: center;
      gap: 5px;
      font-family: 'Inter-600';
      font-size: 16px;
      height: 30px;
      color: var(--main-text-color);

      &.clicked {
        .arrow {
          transform: rotateX(180deg);
        }
      }
    }
    
    .invite {
      width: 30px;
      height: 30px;
      align-self: center;
    }
  }
}
.other { // sidebar-other
  padding: 0 10px;

  & > div:not(.divider) {
    padding: 16px 0;
  }

  .server-info, .channels {
    align-items: flex-start;
    width: 100%;

    button {
      background-color: transparent;
      width: 100%;
      text-align: left;
      gap: 5px;
      font-family: var(--font-family-500);
      font-size: 15px;
      padding: 5.5px 8px;
      border-radius: 8px;
      color: var(--muted-text-color);
      transition: background-color .3s;
      align-items: center;
      
      &:hover {
        background-color: var(--system-back-color1);
        color: var(--main-text-color)
      }
    }
  }

  .categories {
    .category {
      font-family: var(--font-family-500);
      font-size: 13px;
      color: var(--muted-text-color);

    }
  }
}


</style>