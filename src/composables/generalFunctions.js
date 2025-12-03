import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted } from 'vue';

const getInitialSidebarWidth = () => {
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
};

const sidebarWidth = ref(getInitialSidebarWidth());
const navbarWidth = ref(68);

export function generalFunctions() {
  const store = useStore();

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
  return {
    dialogNames,
    memberWord,
    sidebarWidth,
    updateSidebarWidth,
    navbarWidth,
    profileWidth,
    headerWidth
  };
}