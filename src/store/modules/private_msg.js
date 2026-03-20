
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
    ],
  },
  getters: {
    getDialogs: (state) => state.dialogs,
    getDialogField: (state) => (uuid, field) => {
      const dialog = state.dialogs.find(d => d.uuid === uuid);
      return dialog[field];
    },
  },
  mutations: {
    SET_DIALOGS(state, dialogs) {
      state.dialogs = dialogs;
    },
  },
  actions: {
  }
}