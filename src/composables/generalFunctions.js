import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const sidebarWidth = ref(240); // начальная ширина sidebar
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
  }

  const profileWidth = computed(() => {
    return navbarWidth.value + sidebarWidth.value - 20;
  })
  return {
    dialogNames,
    memberWord,
    sidebarWidth,
    updateSidebarWidth,
    navbarWidth,
    profileWidth
  };
}