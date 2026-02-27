import { computed, ref, onMounted, onUnmounted } from 'vue';

// рендерится один раз

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

  const updateSidebarWidth = (newVal) => {
    sidebarWidth.value = newVal;
    localStorage.setItem('sidebarWidth', newVal.toString());
    //console.log('Sidebar width saved to localStorage:', newVal);
  }

  const profileWidth = computed(() => { // нижнее левое меню юзера 
    return navbarWidth.value + sidebarWidth.value - 20;
  })

  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  const headerWidth = computed(() => {
    return windowWidth.value - navbarWidth.value - sidebarWidth.value;
  })

  const mainHeaderHeight = ref(24);
  const headerHeight = ref(50);
  const contentHeight = computed(() => {
    return windowHeight.value - headerHeight.value - mainHeaderHeight.value;
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
    sidebarWidth,
    updateSidebarWidth,
    contentHeight,
    navbarWidth,
    profileWidth,
    headerWidth,
  };
}
