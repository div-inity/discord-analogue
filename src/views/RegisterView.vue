<template>
  <div class="register-screen flex row">
    <form action="" class="register-form flex column">
      <h1>Создать учётную запись</h1>
      <div v-for="(field, key) in Object.values(fields)" :key="field.id" class="flex column form-row">
        <label :for="field.id">{{ field.label }}</label>
        <input :type="field.type || 'text'" :id="field.id" v-model="field.value" @focus="field.focused = true"
          @blur="() => { field.focused = false; validateField(field) }" autocomplete="off" />
        <Hint v-show="shouldShowHint(field.id)" :text="field.hint" :show="field.focused || field.error" />
      </div>

      <label>Дата рождения</label>
      <button class="button-purple button-reg">Создать учётную запись</button>
      <p class="auth-link">
        <RouterLink to="/login" class="login">Уже зарегистрированы? Войти
        </RouterLink>
      </p>
    </form>
  </div>
</template>
<script setup>
import Hint from '@/components/Hint.vue';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

import { useRouter } from 'vue-router'
const router = useRouter()
if (store.state.user.user != null) {
  router.push('/friends')
}


const shouldShowHint = (fieldId) => {
  const field = fields[fieldId];
  return field.focused || field.error;
};
const validateField = (field) => {
  // Например: минимальная длина для пароля
  if (field.id === 'password') {
    field.error = field.value.length < 8;
  }
  // Для других полей можете аналогично
};
const fields = reactive({
  email: {
    label: 'E-mail',
    id: 'email',
    value: '',
    focused: false,
    error: false,
    hint: 'Введите ваш email',
  },
  nikname: {
    label: 'Отображаемое имя',
    id: 'nikname',
    value: '',
    focused: false,
    error: false,
    hint: 'Это имя в профиле',
  },
  name: {
    label: 'Имя пользователя',
    id: 'name',
    value: '',
    focused: false,
    error: false,
    hint: 'Введите ваше имя',
  },
  password: {
    label: 'Пароль',
    id: 'password',
    value: '',
    focused: false,
    error: false,
    type: 'password',
    hint: 'Минимум 8 символов',
  }
});
console.log(/* fields, */ Object.keys(fields))
</script>
<style lang="scss">
body {
  font-family: var(--Ubuntu);
  background-image: url(@/assets/img/BackgroungAuth.svg);
  background-size: cover;

  #app {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
}

.register-screen {
  width: 500px;
  background-color: var(--system-back-color3);
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  column-gap: 5%;


  .register-form {
    display: flex;
    flex-direction: column;
    padding: 33px;
    border-radius: 5px;
    width: 100%;
    height: 100%;

    .form-row {
      overflow: hidden;
    }


    h1 {
      color: var(--loud-text-color);
      font-size: 25px;
      line-height: 120%;
      text-align: center;
    }

    p {
      text-align: center;
      color: var(--muted-text-color);
      font-size: 15px;
      line-height: 133%;
    }

    label {
      color: var(--muted-text-color);
      text-transform: uppercase;
      font-size: 12px;
      line-height: 133%;
      margin-top: 20px;
    }

    input {
      height: 40px;
      background-color: var(--system-back-color5);
      margin-block: 8px;
    }

    a {
      font-size: 13px;
    }

    .button-reg {
      font-size: 14px;
      line-height: 171%;
      padding-block: 9px;
      margin-bottom: 12px;
      margin-top: 22px;
    }

    p.auth-link {
      align-self: flex-start;
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 800px) {
  html {
    height: 100vh !important;
    overflow-y: auto;

    #app {
      width: auto;
      height: auto;
      background-image: none;
    }

    .register-screen {
      flex-direction: column;
      align-items: center;
      width: 80vw;
      margin-block: 33px;

      .register-form {
        width: 100%;
      }

    }
  }
}

@media screen and (max-width: 400px) {
  html {
    .register-screen {
      flex-direction: column;
      align-items: center;
      width: 100vw;
      margin-block: 0;
      border-radius: 0;
    }
  }
}
</style>