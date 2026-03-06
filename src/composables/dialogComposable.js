import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { userComposable } from './userComposable';
import { sleep } from './generalFunctions';

const activeDialogID = ref(null); // Открытый диалог (id диалога) - если есть открытый
const members_info = ref(null); // Инфо открытого диалога
const unreadCount = ref(0); // Общее количество непрочитанных сообщений
const unreadDialogs = ref(null); // Непрочитанные диалоги



export function dialogComposable () {
  //рендерится для каждого компонента

  
  const store = useStore();
  const {user, userToken} = userComposable()


  const dialogs = computed(() => store.getters['private_msg/getDialogs'] || []);
  //console.log(dialogs.value)


  const dialogNames = (m_info, field = 'nickname') => { //Для перечисления имен в чате через запятую - передавать members_info
    if (!m_info) {
      return '';
    }
    //console.log(m_info)
    const filtered_info = m_info.filter(item => item.id !== Number(user.value.id)); // Удаление из списка имени хозяина аккаунта
    const members_names = filtered_info
    ?.map(item => item[field])   // использовать переданное поле
    .filter(name => name !== undefined && name !== null); // исключить undefined/null
    
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


  async function setDialogs() { // Поиск всей информации обо всех диалогах
    const token = userToken.value; 
    
    try {
      const response = await fetch('/api/v1/dialogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      //console.log(data)
      store.commit('private_msg/SET_DIALOGS', data);
      setUnreadDialogs()
      return data;
    } catch (error) {
      console.error('Ошибка при GET-запросе setDialogs:', error);
    }
  }

  

  async function setChat(uuid) { // Получение инфо об одном диалоге по id диалога
    const token = userToken.value; 

    try {
      const response = await fetch(`/api/v1/dialogs/${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Ошибка при GET-запросе setChat:', error);
    }
  }
  
  function setUnreadDialogs () { // Вывод инфо обо всех непрочитанных диалогах
    const r = computed(() => dialogs.value.filter(n => parseInt(n?.unread_count) > 0))
    unreadDialogs.value = r.value;
    //console.log(unreadDialogs.value)
  }

  const setActiveDialogID = (uuid) => { // Установить айди открытого диалога
    activeDialogID.value = uuid;
  }


  
  

  async function getMembers_info(uuid) { // Получить инфо о членах диалогов
    while (dialogs.value.length == 0) {
      await sleep(200);
    }
    // Проверяем наличие диалога с этим uuid
    const dialog = dialogs.value.find(d => d.uuid === uuid);
    if (!dialog) {
      console.warn('Диалог не найден!');
      return [];
    }

    // Получаем данные из хранилища и присваиваем реактивной переменной
    const membersData = store.getters['private_msg/getMembers_info'](uuid) || [];
    members_info.value = membersData;
    return members_info;
  }

  return {
    dialogNames,
    memberWord,
    activeDialogID,
    dialogs,
    setDialogs,
    unreadDialogs,
    setChat,
    getMembers_info,
    setActiveDialogID,
    members_info,
  }
}