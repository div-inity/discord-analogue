import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router'

// рендерится один раз

const userToken = ref(localStorage.getItem('token'));
//console.log(userToken.value)


const activeDialog = ref(null); // Открытый диалог (id диалога) - если есть открытый

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

const getInitialSidebarWidth = () => { // Установка ширины сайдбара
  try {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      const width = parseInt(savedWidth);
      // Проверяем, что значение в допустимых пределах
      return (width >= 190 && width <= 360) ? width : 240;
    }
    return 240;
  } catch (error) {
    console.warn('Ошибка при чтении из localStorage:', error);
    return 240;
  }
};//getInitialSidebarWidth

const sidebarWidth = ref(getInitialSidebarWidth());
const navbarWidth = ref(68);

export function generalFunctions() {
  //рендерится для каждого компонента
  
  const router = useRouter()
  const store = useStore();
  
  function loadUser() { // Загрузка инфо юзера из токена в vuex
    if (userToken.value) {
      const payload = parseJwt(userToken.value);
      const userData = {
        id: payload.id,
        name: payload.name,
        nickname: payload.nickname,
        email: payload.email,
        birthdate: payload.birthdate,
      };
      store.commit('user/SET_USER', userData)
    }
  }
  //loadUser

  const user = computed(() => store.getters['user/getUser'])
  
  const dialogs = computed(() => store.state.private_msg.dialogs);

  const dialogNames = (dialogId) => { //Для перечисления имен в чате через запятую
    // Находим диалог по ID
    const dialog = dialogs.value.find(d => d.id === dialogId);

    if (!dialog || !Array.isArray(dialog.names)) {
      return '';
    }
    return dialog.names.join(', ');
  };
  // dialogNames

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
  };
  // memberWord

  const updateSidebarWidth = (newVal) => {
    sidebarWidth.value = newVal;
    localStorage.setItem('sidebarWidth', newVal.toString());
    //console.log('Sidebar width saved to localStorage:', newVal);
  }

  const profileWidth = computed(() => {
    return navbarWidth.value + sidebarWidth.value - 20;
  })

  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  const headerWidth = computed(() => {
    return windowWidth.value - navbarWidth.value - sidebarWidth.value;
  })


  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  const updateHeight = () => {
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateHeight);
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateHeight);
    window.removeEventListener('resize', updateWidth);
  });

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
    dialogNames,
    memberWord,
    sidebarWidth,
    updateSidebarWidth,
    navbarWidth,
    profileWidth,
    headerWidth,
    textStatus,
    loadUser,
    user,
    activeDialog
  };
}