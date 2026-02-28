import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted } from 'vue';

// Константы для избежания магических строк
const STORAGE_KEYS = {
  TOKEN: 'token'
};

const USER_STATUS = {
  PHONE: 'phone',
  OFFLINE: 'offline',
  DND: 'red', // Do Not Disturb
  INACTIVE: 'moon',
  ONLINE: 'online',
  STREAMING: 'streaming'
};

// Состояние (синглтон) - объявлено вне функции
const userToken = ref(null);

// Функции для работы с токеном (тоже синглтон)
const setToken = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    userToken.value = token || null;
  } catch (error) {
    console.error('Ошибка при чтении токена из localStorage:', error);
    userToken.value = null;
  }
};

// Инициализация
setToken();

// Подписка на изменения localStorage (если токен меняется в другой вкладке)
const handleStorageChange = (event) => {
  if (event.key === STORAGE_KEYS.TOKEN) {
    setToken();
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', handleStorageChange);
}

// Для очистки при необходимости (можно вызвать в корневом компоненте)
export const cleanupTokenListener = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', handleStorageChange);
  }
};

// Вспомогательные функции (чистые функции, не требуют реактивности)
function parseJwt(token) {
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Ошибка при парсинге JWT:', error);
    return null;
  }
}

export function userComposable() {
  const store = useStore();
  
  // Вычисляемые свойства
  const user = computed(() => store.getters['user/getUser']);
  const isAuthenticated = computed(() => !!userToken.value && !!user.value);
  const userName = computed(() => {
    if (!user.value) return 'Пользователь';
    return user.value.name || user.value.nickname || 'Пользователь';
  });
  
  // Загрузка пользователя
  function loadUser(token = null) {
    // Если передан новый токен, обновляем его
    if (token) {
      try {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        setToken();
      } catch (error) {
        console.error('Ошибка при сохранении токена:', error);
        return;
      }
    }
    
    // Проверяем наличие токена
    if (!userToken.value) {
      // Очищаем стор, если токена нет
      store.commit('user/SET_USER', null);
      return;
    }
    
    try {
      const payload = parseJwt(userToken.value);
      //console.log("payload", payload)
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Проверяем валидность токена
      if (!payload || !payload.id || (payload.exp && currentTime >= payload.exp)) {
        throw new Error('Токен невалиден или истек');
      }
      
      const userData = {
        id: payload.id,
        name: payload.name || '',
        nickname: payload.nickname || '',
        email: payload.email || '',
        birthdate: payload.birthdate || '',
        roles: payload.roles || [],
        exp: payload.exp // Добавляем время истечения
      };
      
      store.commit('user/SET_USER', userData);
      
    } catch (error) {
      console.error('Ошибка при загрузке пользователя:', error);
      clearToken(); // Используем существующую функцию
    }
  }
  
  // Очистка токена
  function clearToken() {
    userToken.value = null;
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Ошибка при удалении токена:', error);
    }
    store.commit('user/SET_USER', null);
    // Не делаем reload, это должно решаться на уровне роутинга
    // window.location.reload();
  }
  
  // Выход из системы
  function logout() {
    clearToken();
    window.location.reload();
    // Перенаправление на страницу входа можно добавить здесь
    // или обрабатывать в компоненте через watch
  }
  
  // Текстовое представление статуса
  function textStatus(status) {
    const statusMap = {
      [USER_STATUS.PHONE]: 'В сети',
      [USER_STATUS.OFFLINE]: 'Не в сети',
      [USER_STATUS.DND]: 'Не беспокоить',
      [USER_STATUS.INACTIVE]: 'Неактивен',
      [USER_STATUS.ONLINE]: 'В сети',
      [USER_STATUS.STREAMING]: 'В сети'
    };
    
    return statusMap[status] || 'Неизвестный статус';
  }
  
  // Автоматическая загрузка пользователя при монтировании
  onMounted(() => {
    if (userToken.value && !user.value) {
      loadUser();
    }
  });
  
  // Очистка при размонтировании (если есть watcher'ы)
  onUnmounted(() => {
    // Здесь можно очистить watcher'ы, если они будут добавлены
  });
  
  return {
    // Состояние
    user,
    userToken,
    isAuthenticated,
    userName,
    
    // Методы
    loadUser,
    clearToken,
    logout,
    textStatus,
  };
}

// Дополнительные утилиты (чистые функции)
export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !!(payload && payload.exp && currentTime < payload.exp);
  } catch {
    return false;
  }
};

export const getTokenExpiration = (token) => {
  if (!token) return null;
  try {
    const payload = parseJwt(token);
    return payload?.exp ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
};