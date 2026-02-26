import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';

const activeDialog = ref(null); // Открытый диалог (id диалога) - если есть открытый

export function dialogComposable () {
  //рендерится для каждого компонента
  const store = useStore();

  const dialogs = ref(store.state.private_msg.dialogs);
  console.log(dialogs)

  watchEffect(() => {
    dialogs.value = store.state.private_msg.dialogs;
    console.log('dialogs обновлены:', dialogs.value);
  });

  const dialogNames = (dialogId) => { //Для перечисления имен в чате через запятую
    // Находим диалог по ID
    const dialog = dialogs?.value.find(d => d.id === dialogId);

    if (!dialog || !Array.isArray(dialog.names)) {
      return '';
    }
    return dialog.names.join(', ');
  };// dialogNames

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
  };// memberWord

    return {
      dialogNames,
      memberWord,
      activeDialog,

    }
}