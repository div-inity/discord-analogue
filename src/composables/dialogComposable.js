import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { userComposable } from './userComposable';

const activeDialog = ref(null); // Открытый диалог (id диалога) - если есть открытый

export function dialogComposable () {
  //рендерится для каждого компонента
  const store = useStore();
  const {user} = userComposable()

  const dialogs = computed(() => store.getters['private_msg/getDialogs'])
  console.log(dialogs.value)

  watchEffect(() => {
    //dialogs = computed(() => store.getters['private_msg/getDialogs'])
    console.log('dialogs обновлены:', dialogs.value);
  });

  const dialogNames = (row) => { //Для перечисления имен в чате через запятую
    const dialog = row;
    if (!!dialog == false) {
      console.log("dialogNames - dialog не найден")
      return
    }
    console.log("dialogNames - dialog: ", dialog)
    let members_info = dialog.members_info.filter(item => item.id !== user.value.id);
    
    console.log("members_info", members_info)
    const members_names = members_info?.map(e => e.name);
    
    console.log('members_names', members_names)
    console.log("user.value.id", user.value.id)
    
    if (!members_names || !Array.isArray(members_names)) {
      return '';
    }
    return members_names.join(', ');
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
      dialogs,
    }
}