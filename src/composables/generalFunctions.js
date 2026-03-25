import { computed, ref, onMounted, onUnmounted } from 'vue';
// рендерится один раз

export const PROJECT_NAME = 'Discord Analogue';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function getInitialSidebarWidth () { // Установка ширины сайдбара
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

// Внутреннее состояние (синглтон)
const state = {
  sidebarWidth: ref(getInitialSidebarWidth()),
  navbarWidth: ref(68),
  windowWidth: ref(window.innerWidth),
  windowHeight: ref(window.innerHeight),
  mainHeaderHeight: ref(24),
  headerHeight: ref(50),
  instanceCount: 0, // количество активных экземпляров компонента
  isResizeListenerActive: false,// флаг,указывающий активность события resize
};

// Вычисляемые значения (синглтон)
export const profileWidth = computed(() => state.navbarWidth.value + state.sidebarWidth.value - 20);
export const headerWidth = computed(() => state.windowWidth.value - state.navbarWidth.value - state.sidebarWidth.value);
export const contentHeight = computed(() => state.windowHeight.value - state.headerHeight.value - state.mainHeaderHeight.value);

function updateDimensions() {
  state.windowWidth.value = window.innerWidth;
  state.windowHeight.value = window.innerHeight;
};

export function sleep(ms) { // Функция ожидания
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function generalFunctions() {

  function updateSidebarWidth (newVal) {
    state.sidebarWidth.value = newVal;
    localStorage.setItem('sidebarWidth', newVal.toString());
  };//updateSidebarWidth

  // Увеличиваем счетчик при монтировании
  onMounted(() => {
    state.instanceCount++;
    if (!state.isResizeListenerActive) {
      window.addEventListener('resize', updateDimensions);
      state.isResizeListenerActive = true;
    }
  });
  
  // Уменьшаем счетчик при размонтировании
  onUnmounted(() => {
    state.instanceCount--;
    if (state.instanceCount === 0 && state.isResizeListenerActive) {
      window.removeEventListener('resize', updateDimensions);
      state.isResizeListenerActive = false;
    }
  });
  
  return {
    updateSidebarWidth,
    sidebarWidth: state.sidebarWidth,
    navbarWidth: state.navbarWidth,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    headerHeight: state.headerHeight,
    mainHeaderHeight: state.mainHeaderHeight
  };
}