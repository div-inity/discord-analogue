import { onMounted, ref } from 'vue';

const STORAGE_KEYS = {
  TOKEN: 'token',
};

const USER_STATUS = {
  PHONE: 'phone',
  OFFLINE: 'offline',
  DND: 'red', // Do Not Disturb
  INACTIVE: 'moon',
  ONLINE: 'online',
  STREAMING: 'streaming',
};

export const userToken = ref(null);

export function setToken() {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    userToken.value = token || null;
    userCheck.value.token = !!userToken.value;
  }
  catch (error) {
    console.error('Error read token from localStorage: ', error);
    userToken.value = null;
  }
}

function handleStorageChange (event) {
  if (event.key === STORAGE_KEYS.TOKEN) {
    setToken();
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', handleStorageChange);
}

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
};

export const user = ref(null);
export const isAuthenticated = ref(false);

export const userName = () => {
  if (!user.value) return 'Пользователь';
  return user.value.name || user.value.nickname || 'Пользователь';
};

export const userCheck = ref({ user: false, token: false });

export function loadUser(token = null) {
  if (token) {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      setToken();
    } catch (error) {
      console.error('Error with saving token into localStorage:', error);
      return;
    }
  }

  if (!userToken.value) {
    user.value = null;
    userCheck.value.token = false;
    userCheck.value.user = false;
    return;
  }

  try {
    let payload = parseJwt(userToken.value);
    let currentTime = Math.floor(Date.now() / 1000);

    if (!payload || !payload.id || (payload.exp && currentTime >= payload.exp)) {
      throw new Error('Token is invalid or expired');
    }

    let userData = {
      id: payload.id,
      name: payload.name || '',
      nickname: payload.nickname || '',
      email: payload.email || '',
      birthdate: payload.birthdate || '',
      roles: payload.roles || [],
      exp: payload.exp,
    };

    user.value = userData;
    isAuthenticated.value = true;

    userCheck.value.token = !!userToken.value;
    userCheck.value.user = !!user.value;

    setTimeout(() => logout(), payload.exp * 1000 - Date.now());
  } catch (error) {
    console.error('Error user loading: ', error);
    logout();
  }
}

export function clearToken() {
  userToken.value = null;
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('Ошибка при удалении токена:', error);
  }
  user.value = null;
}

function clearLocalStorage () {
  try {
    localStorage.removeItem('friendListMode');
    //localStorage.removeItem('theme');
    localStorage.removeItem('sidebarWidth');
  } catch (error) {
    console.error('Ошибка при удалении токена:', error);
  }
}

export function logout() {
  clearToken();
  clearLocalStorage();
  window.location.reload();
}

export function textStatus(status) {
  const statusMap = {
    [USER_STATUS.PHONE]: 'В сети',
    [USER_STATUS.OFFLINE]: 'Не в сети',
    [USER_STATUS.DND]: 'Не беспокоить',
    [USER_STATUS.INACTIVE]: 'Неактивен',
    [USER_STATUS.ONLINE]: 'В сети',
    [USER_STATUS.STREAMING]: 'В сети',
  };

  return statusMap[status] || 'Неизвестный статус';
}

onMounted(() => {
  if (userToken.value && !user.value) {
    loadUser();
  }
});

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
