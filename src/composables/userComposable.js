import { useStore } from 'vuex';
import { computed, ref} from 'vue';
// рендерится один раз

const userToken = ref(null)

const setToken = () => {
  userToken.value = localStorage.getItem('token') || null;
  //console.log(userToken.value || "userToken.value=null")
}
setToken()

const clearToken = () => {
  userToken.value = null
  localStorage.setItem('token', null)
  window.location.reload()
}

function parseJwt(token) { // Парсинг токена в инфо юзера
  try {
    const base64Url = token.split('.')[1];
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
}//parseJwt

export function userComposable() {
  //рендерится для каждого компонента
  const store = useStore();

  const user = computed(() => store.getters['user/getUser'])
  //console.log(user.value)

  function loadUser(token = null) {
    // Если передан новый токен, обновляем его
    if (token) {
      localStorage.setItem("token", token);
      setToken()
    }
    // Проверяем наличие токена
    if (!userToken.value) {
      //console.log("Токен отсутствует");
      return;
    }
    try {
      //console.log("Загрузка loadUser");
      //console.log("Токен:", userToken.value);
      
      const payload = parseJwt(userToken.value);
      
      // Проверяем, что payload содержит нужные поля
      if (!payload || !payload.id) {
        throw new Error("Невалидный токен");
      }
      
      //console.log("Payload:", payload);
      
      const userData = {
        id: payload.id,
        name: payload.name || '',
        nickname: payload.nickname || '',
        email: payload.email || '',
        birthdate: payload.birthdate || '',
      };
      
      store.commit('user/SET_USER', userData);
      //console.log("Данные пользователя загружены в store");
      
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
      // В случае ошибки очищаем токен
      userToken.value = null;
      localStorage.removeItem("token");
      store.commit('user/SET_USER', null);
    }
  }//loadUser


  const textStatus = (status) => {
    switch (status) {
      case 'phone':
        return 'В сети';
      case 'offline':
        return 'Не в сети';
      case 'red':
        return 'Не беспокоить';
      case 'moon':
        return 'Неактивен';
      case 'online':
        return 'В сети';
      case 'streaming':
        return 'В сети';
    }
  };

  return {
    loadUser,
    user,
    clearToken,
    textStatus,
    userToken
  }
}