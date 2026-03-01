import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { userComposable } from './userComposable';

const activeDialog = ref(null); // Открытый диалог (id диалога) - если есть открытый
const unreadCount = ref(0); // Общее количество непрочитанных сообщений
let unreadDialogs = ref(null); // Непрочитанные диалоги




export function dialogComposable () {
  //рендерится для каждого компонента

  
  const store = useStore();
  const {user, userToken} = userComposable()

  const dialogs = computed(() => store.getters['private_msg/getDialogs'] || []);
  //console.log(dialogs.value)


  const dialogNames = (row) => { //Для перечисления имен в чате через запятую
    const dialog = row;
    if (!dialog) {
      return
    }
    let members_info = dialog.members_info.filter(item => item.id !== Number(user.value.id));
    const members_names = members_info?.map(e => e.name);
    
    if (!members_names || !Array.isArray(members_names)) {
      return '';
    }
    return members_names.join(', ');
  };// dialogNames

  const memberWord = (count) => { // Для указания кол-ва участников
    const by10 = count % 10;
    const by100 = count % 100;

    if (by10 === 1 && by100 !== 11) {
      return ` участник`;
    } else if (
      (by10 >= 2 && by10 <= 4) &&
      !(by100 >= 12 && by100 <= 14)
    ) {
      return ` участника`;
    } else {
      return ` участников`;
    }
  };// memberWord


  async function setDialogs() {
      // Получаем токен из другого модуля стора
    const token = userToken.value; // предположим, токен хранится в user модуле
    
    try {
      const response = await fetch('/api/v1/dialogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data)
      store.commit('private_msg/SET_DIALOGS', data);
      setUnreadDialogs()
      return data;
    } catch (error) {
      console.error('Ошибка при GET-запросе SET_DIALOGS:', error);
    }
  }
  
  function setUnreadDialogs () {
    unreadDialogs = computed(() => dialogs.value.filter(n => parseInt(n?.unread_count) > 0))
    console.log(unreadDialogs.value)
  }

  const setActiveDialog = (id) => { // Установить открытый диалог
    activeDialog.value = id
  }

  const closeActiveDialog = () => { // Закрыть диалог
    activeDialog.value = null;
  };

    return {
      dialogNames,
      memberWord,
      activeDialog,
      dialogs,
      setDialogs,
      unreadDialogs,
    }
}