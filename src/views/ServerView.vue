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
        <button v-for="s in server_info" class="flex row server-info-button">
          <Icon :name="s.icon" size="18"/>
          {{ s.name }}
        </button>
      </div>

      <Divider h width="100" color="var(--system-back-color1)"/>

      <div class="categories flex column" v-for="c in server?.categories">
        <p 
          class="category"
          :class="{collapsed: collapsedCategory(c.id)}"
          @click="collapse(c.id)"
        >
          {{ c.name }}
          <Icon 
            :name="collapsedCategory(c.id) ? 'arrow_right' : 'arrow_down'" 
            size="10"/>
        </p>
        <div 
          v-for="ch in c.channels"
          class="channels flex column"
        >
          <button
            v-if="ch.new_messages > 0 || !collapsedCategory(c.id)"
            class="channel flex row"
            :class="{new: ch.new_messages > 0}"
            >
            <Icon :name="channelIcons[ch.type]" size="18"/>
            <span class="channel-name">{{ ch.name }}</span>
            <div class="channel-actions">
              <Mentions 
                v-if="ch.mentions > 0" 
                outlineColor="var(--system-back-color3)"
              >{{ ch.mentions }}</Mentions>
              <div class="hovered-actions flex row">
                <Icon name="add_friend" size="17" v-tippy="{ content: 'Пригласить на канал', placement: 'top' }"/>
                <Icon name="settings" size="17" v-tippy="{ content: 'Настроить канал', placement: 'top' }"/>
              </div>
            </div>
          </button>
        </div>
      </div>
    </template>
  </Sidebar>
  <router-view />serverview
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Icon from '@/components/Icon.vue';
import Divider from '@/components/Divider.vue';
import Mentions from '@/components/Mentions.vue';

import { generalFunctions } from '@/composables/generalFunctions';

import { computed, ref, watch } from 'vue';
import store from '@/store';
import { useRoute } from 'vue-router';

const route = useRoute();

const {sidebarWidth, mainHeaderHeight, headerHeight} = generalFunctions();

const server = ref(null);
const serverNameClicked = ref(false); // Флаг для проявления всплывающего меню
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
    icon: 'people',
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

const collapsedCategory = (id) => {
  return server.value?.user_settings?.collapsed_categories?.includes(id) || false;
};

function collapse (id) {
  store.commit('servers/toggleCollapseCategory', {
    server_id: server.value.id,
    category_id: id
  });
}

watch(
  () => route.params.id,
  (id, oldid) => {
    if (id != oldid) {
      server.value = computed(() => store.getters['servers/getServer'](Number(id))).value;
      serverNameClicked.value = false;
      //console.log(server.value);
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

    button.server-info-button {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    button.channel , button.server-info-button {
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
        color: var(--main-text-color);
      }
      &.active {
        background-color: var(--system-back-color1);
        color: var(--main-text-color);
      }
    }
  }

  .categories {
    .category {
      font-family: var(--font-family-500);
      font-size: 13px;
      color: var(--muted-text-color);
      transition: color .3s;
      margin-bottom: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        color: var(--main-text-color);
        cursor: pointer;

        svg path {
          fill: var(--main-text-color);
        }
      }
    }
    .channels {
      .channel {
        position: relative;

        &:hover {
          .mentions {
            display: none;
          }
          .hovered-actions {
            display: flex;
          }
        }

        &.new {
          color: var(--main-text-color);
        }

        &.new::before {
          position: absolute;
          content: "";
          width: 4px;
          background: var(--loud-text-color);
          border-radius: 0 4px 4px 0;
          top: 50%;
          transform: translate(0%, -50%);
          transition: height 0.3s ease, left 0.3s ease;
          height: 8px;
          left: -10px;
        }

        .channel-name {
          flex-grow: 2;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .hovered-actions {
          display: none;
          column-gap: 3px;

          .icon:hover {
            svg path {
              fill: var(--main-text-color);
            }
          }
        }
      }
    }
  }
}


</style>