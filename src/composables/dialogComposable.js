import { computed, onMounted, ref } from 'vue';
import { user, userToken } from './userComposable';
import { sleep } from './generalFunctions';
import { useSocket } from './useSocket';
import { initSocket } from '@/services/socketService';

export const dialogs = ref([]);

export const activeDialogID = ref(null); // Открытый диалог (id диалога) - если есть открытый
export const members_info = ref(null); // Инфо открытого диалога
export const unreadDialogs = ref(null); // Непрочитанные диалоги

export function dialogNames(m_info, field = 'nickname') { //Для перечисления имен в чате через запятую - передавать members_info
  if (!m_info) {
    return '';
  }
  const filtered_info = m_info.filter(item => item.id !== Number(user.value.id)); // Удаление из списка имени хозяина аккаунта
  const members_names = filtered_info
  ?.map(item => item[field])   // использовать переданное поле
  .filter(name => name !== undefined && name !== null); // исключить undefined/null
  
  if (!members_names || !Array.isArray(members_names)) {
    return '';
  }
  return members_names.join(', ');
};// dialogNames

export function memberWord(count) { // Для указания кол-ва участников
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
};

export async function setDialogs() { // Поиск всей информации обо всех диалогах
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
    //store.commit('private_msg/SET_DIALOGS', data);
    dialogs.value = data;
    setUnreadDialogs();
    return data;
  } catch (error) {
    console.error('Ошибка при GET-запросе setDialogs:', error);
  }
};

export async function setChat(uuid) { // Получение инфо об одном диалоге по id диалога
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
};//setChat

export function setUnreadDialogs() { // Вывод инфо обо всех непрочитанных диалогах
  const r = computed(() => dialogs.value.filter(n => parseInt(n?.unread_count) > 0))
  unreadDialogs.value = r.value;
};

export function setActiveDialogID(uuid) { // Установить айди открытого диалога
  activeDialogID.value = uuid;
};


export async function getDialogFieldByID(uuid, field) { // Получить значение поля любого диалога
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
  const f = ref(null);
  //f.value = store.getters['private_msg/getDialogField'](uuid, field) || [];
  f.value = dialogs.value.find(d => d.uuid === uuid)[field] || [];
  if (field == 'members_info') members_info.value = f.value;
  return f;
};

export function dialogComposable () {
  return {
    dialogNames,
    memberWord,
    activeDialogID,
    dialogs,
    members_info,
    unreadDialogs,
    setDialogs,
    setChat,
    setActiveDialogID,
    getDialogFieldByID,
  }
}