import { useStore } from 'vuex';
import { computed } from 'vue';

export function generalFunctions() {
  const store = useStore();

  const dialogs = computed(() => store.state.private_msg.dialogs);

  const dialogNames = (dialogId) => {
    // Находим диалог по ID, а не по индексу массива
    const dialog = dialogs.value.find(d => d.id === dialogId);

    if (!dialog || !Array.isArray(dialog.names)) {
      return '';
    }
    return dialog.names.join(', ');
  };

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

  return {
    dialogNames,
    memberWord,
  };
}