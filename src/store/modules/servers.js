export default {
  namespaced: true,
  state: {
    servers: [
      {
        id: 1,
        name: "SIRUS",
        icon: 'communityServer',
        boostLevel: 3,
        missed_messages: 71,
        last_message: "2025-21-04 15:20:03",
        avatar: require('@/assets/img/Server Icon.jpg'),
        mentions: 3100,
        activity_type: 'display',
        my_activity: true,
        total_active_users: 3,
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
          'https://avatars.mds.yandex.net/get-yapic/35885/srMKjfT9weL7jIicQXjiMCrBpVo-1/orig',
        ],
        banner: require('@/assets/img/UserIcon3.jpg'),
        user_settings: {
          collapsed_categories: [],
        },
        categories: [
          {
            id: 1,
            name: 'Информационные каналы',
            channels: [ 
              {
                name: 'Добро пожаловать',
                type: 'text',
                mentions: 100,
                description: 'Добро пожаловать на сервер Sirus.Su! Рады вас видеть!',
                rules: {},
                new_messages: 3,
              },
              {
                name: 'правила',
                type: 'rules',
                mentions: 0,
                description: 'Соблюдайте правила сервера, будьте няшками!',
                rules: {},
                new_messages: 3,
              },
              {
                name: 'вопрос_ответ',
                type: 'text',
                mentions: 0,
                description: 'Самые часто отвечаемые ответы.',
                rules: {},
                new_messages: 0,
              },
            ]
          },
          {
            id: 2,
            name: 'Объявления',
            channels: [
              {
                name: 'новости',
                type: 'announcements', // объявления
                description: 'Последние новости проекта. Будьте в курсе последних событий!',
                mentions: 3,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'список_изменений',
                type: 'announcements',
                description: 'Здесь должен быть список изменений, но будет ли?',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'список_исправленного',
                type: 'text',
                description: '',
                mentions: 1,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'media',
                type: 'announcements',
                description: 'Ролики, обзоры, гайды, статьи.',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'стримы',
                type: 'text',
                description: 'Стримы — то, что все так не любят, но иногда смотрят ради интереса.',
                mentions: 5,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'статус_сервера',
                type: 'announcements',
                description: 'Все актуальные новости по работе игровых миров, а также сайта и форума!',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'розыгрыши',
                type: 'text',
                description: 'Еженедельные розыгрыши на Sirus.su!',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'опросы',
                type: 'text',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
            ]
          },
          {
            id: 3,
            name: 'Каналы для общения',
            channels: [
              {
                name: 'песочница',
                type: 'text',
                description: 'Раздолье флудерастов. Добро пожаловать!',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'soulseeker-x1',
                type: 'text',
                description: 'Общий чат Soulseeker x1',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'scourge-x2',
                type: 'text',
                description: 'Общий чат Scourge x2',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'sirus-x5',
                type: 'text',
                description: 'Общий чат Sirus x5',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'neverest-x3',
                type: 'text',
                description: 'Общий чат Neverest x3',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'поиск-спутников',
                type: 'forum',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'игровые-вопросы',
                type: 'forum',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'игровые-обсуждения',
                type: 'forum',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
            ]
          },
          {
            id: 4,
            name: 'Голосовые каналы',
            channels: [
              {
                name: 'Флудилка',
                type: 'voice',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'Группа #1',
                type: 'voice',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'Группа #2',
                type: 'voice',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'Группа #3',
                type: 'private',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'Группа #4',
                type: 'private',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'PvP',
                type: 'voice',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'PvP',
                type: 'private',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'PvE',
                type: 'voice',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'PvE',
                type: 'private',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
              {
                name: 'Карантин',
                type: 'private',
                description: '',
                mentions: 0,
                rules: {},
                new_messages: 0,
              },
            ]
          },
        ]
      },
      {
        id: 2,
        name: "Nice cats",
        icon: 'communityServer',
        boostLevel: 0,
        missed_messages: 1,
        last_message: "2025-21-03 08:09:10",
        avatar: require('@/assets/img/Server Icon1.jpg'),
        activity_type: 'camera',
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
          'https://avatars.mds.yandex.net/get-yapic/35885/srMKjfT9weL7jIicQXjiMCrBpVo-1/orig',
          'https://i.ytimg.com/vi/2lxyzjJedKw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLA8D8TuOlFmBksraGge4gXvrxNfKQ'
        ],
        total_active_users: 10,
      },
      {
        id: 3,
        name: "Help yourself",
        icon: 'communityServer',
        boostLevel: 0,
        /* missed_messages: 1003, */
        last_message: "2025-10-03 21:30:15",
        avatar: require('@/assets/img/Server Icon2.jpg'),
        activity_type: 'call',
        total_active_users: 2,
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
        ],
      },
      {
        id: 4,
        name: "Бастион ненависти",
        icon: 'communityServer',
        boostLevel: 0,
        /* missed_messages: 1003, */
        last_message: "2025-10-03 21:32:15",
        avatar: require('@/assets/img/Server Icon1.svg'),
      },
    ],
  },
  getters: {
    getServers: (state) => state.servers,
    getServer: (state) => (id) => {
      const s = state.servers.find(d => d.id === id);
      return s || null;
    },
  },
  mutations: {
    toggleCollapseCategory (state, { server_id, category_id }) {
      const server = state.servers.find(d => d.id === server_id);
      const findedCategory = server.user_settings.collapsed_categories.indexOf(category_id)
      if (findedCategory > -1) {
        server.user_settings.collapsed_categories.splice(findedCategory, 1);
        return;
      }
      server.user_settings.collapsed_categories.push(category_id);
    },
  },
  actions: {

  },
}