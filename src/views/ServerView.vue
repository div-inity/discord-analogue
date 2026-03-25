<template>
  <Sidebar>
    <template v-slot:header>
      <div class="banner">
        <img :src="state.server.banner" alt="">
      </div>
      <div class="header-actions flex row" :style="{width: sidebarWidth + 'px', top: mainHeaderHeight + 'px'}">
        <button 
          class="server-name flex row" 
          :class="{clicked: serverNameClicked}"
          @click="serverNameClick">
          <Icon name="communityServer" size="18"/>
          {{ state.server.name }}
          <Icon name="arrow_down" size="18" class="arrow"/>
        </button>
        <button class="invite">
          <Icon name="addFriend" size="18" />
        </button>
      </div>
      
    </template>
    <template v-slot:other>
      Нужно бустов
    </template>
  </Sidebar>
  <router-view />serverview
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Icon from '@/components/Icon.vue';

import { generalFunctions } from '@/composables/generalFunctions';
import { ref } from 'vue';


const {sidebarWidth, mainHeaderHeight} = generalFunctions()
const state = {
  server: {
    name: "SIRUS",
    icon: 'communityServer',
    banner: require('@/assets/img/UserIcon3.jpg'),
  }
}

const serverNameClicked = ref(false)

function serverNameClick () {
  serverNameClicked.value = !serverNameClicked.value;
}
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
    background: -webkit-linear-gradient(0deg, rgb(0, 0, 0, .2), rgb(0, 0, 0, .6));
    background: -moz-linear-gradient(0deg, rgb(0, 0, 0, .2), rgb(0, 0, 0, .6));
    background: linear-gradient(0deg, rgb(0, 0, 0, .2), rgb(0, 0, 0, .6));
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.2);
    height: inherit;
    transition: backdrop-filter .3s;
    align-items: center;

    &:hover {
      backdrop-filter: blur(10px); /* Размытие заднего фона */
    }

    button {
      background-color: transparent;
      border-radius: 8px;

      &:hover {
        backdrop-filter: blur(1px); 
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

</style>