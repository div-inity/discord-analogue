import { computed } from 'vue';
import { useStore } from 'vuex';

export function useTheme() {
  const store = useStore();

  const currentTheme = computed(() => store.getters['theme/currentTheme']);
  const isDark = computed(() => currentTheme.value === 'dark');
  const isLight = computed(() => currentTheme.value === 'light');

  function setTheme (theme) {
    store.dispatch('theme/setTheme', theme);
  };

  function toggleTheme () {
    store.dispatch('theme/toggleTheme')
  };

  // Получение CSS переменной
  function getCssVariable (variableName) {
    return computed(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim()
    })
  };

  // Reactively get theme colors
  const themeColors = computed(() => ({
    bg1: getCssVariable('--system-back-color1').value,
    bg2: getCssVariable('--system-back-color2').value,
    bg3: getCssVariable('--system-back-color3').value,
    bg4: getCssVariable('--system-back-color4').value,
    bg5: getCssVariable('--system-back-color5').value,
    loudtext: getCssVariable('--loud-text-color').value,
    text: getCssVariable('--main-text-color').value,
    muted: getCssVariable('--muted-text-color').value,
    icon: getCssVariable('--icon-color').value,
    button: getCssVariable('--button-back-color').value,
  }));

  return {
    currentTheme,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    getCssVariable,
    themeColors
  }
}