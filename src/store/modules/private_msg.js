import { userComposable } from '@/composables/userComposable';
const {userToken} = userComposable()
//console.log(userToken.value)
export default {
  namespaced: true,
  state: {
    missed_messages: [
      {
        id: 12,
        names: ["Василий Николаев"],
        avatars: [require('@/assets/img/UserIcon2.jpg')],
        missed: 1200,
      },
      {
        id: 35,
        names: ["Василий Николаев", "Михаил Шатов"],
        avatars: [require('@/assets/img/UserIcon2.jpg'), require('@/assets/img/UserIcon1.jpg')],
        missed: 2,
      },
    ],
    dialogs: [
      /* {
        id: 2,
        names: ["Михаил Шатов"],
        name: '', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/UserIcon1.jpg'),],
        status: 'phone',
      },
      {
        id: 12,
        names: ["Василий Николаев"],
        name: 'vasilevs_1987', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/UserIcon2.jpg')],
        status: 'offline',
      },
      {
        id: 28,
        names: ["Карабас-Барабас"],
        name: '', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/Server Icon.svg')],
        status: 'online',
      },
      {
        id: 35,
        names: ["Василий Николаев", "Михаил Шатов"],
        avatars: [require('@/assets/img/UserIcon2.jpg'), require('@/assets/img/UserIcon1.jpg')],
        status: 'online',
      },
      {
        id: 101,
        names: ["Анна Шатова"],
        name: '', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/UserIcon.jpg')],
        status: 'red',
      },
      {
        id: 102,
        names: ["Пам пам"],
        name: '', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/UserIcon.jpg')],
        status: 'streaming',
      },
      {
        id: 103,
        names: ["Бдыщь"],
        name: '', // Уникальное имя для сингл-диалогов
        avatars: [require('@/assets/img/UserIcon.jpg')],
        status: 'moon',
      }, */
    ],
  },
  getters: {
    getDialogs: (state) => state.dialogs

  },
  mutations: {
    SET_DIALOGS(state, dialogs) {
      state.dialogs = dialogs;
    }
  },
  actions: {
  }
}