<template>
  <div class="register-screen flex row">
    <form action="" class="register-form flex column">
      <h1>Создать учётную запись</h1>
      <div v-for="(field, key) in Object.values(fields)" 
        :key="field.id" 
        class="flex column form-row">
        <label :for="field.id">
          {{ field.label }}
          <span class="require" v-if="field.required">
          </span>
        </label>
        <input 
          :type="field.type || 'text'" 
          :id="field.id" 
          v-model="field.value" 
          @focus="field.focused = true"
          @blur="() => { field.focused = false; validateField(field) }" 
          @input="validateField(field)"
          autocomplete="off" />
        <Hint 
          v-show="shouldShowHint(field.id)" 
          :text="field.error ? field.error : field.hint"
          :show="field.focused || (field.error != null)" 
          :color="field.error ? 'var(--muted-notification-color)' : null"
          :icon="field.error ? 'info' : null" />
      </div>

      <label>Дата рождения <span class="require"></span></label>
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
  console.log(field.value == '')
  if (field.value == '' && field.required) {
    field.error = 'Обязательно';
    return;
  }
  if (field.id === 'email') {
    field.error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ? ''
      : 'Некорректный адрес электронной почты';
  } else if (field.id === 'nikname') {
    return;
  } else if (field.id === 'name') {
    field.error = 
      (field.value.length < 2 || field.value.length > 32) && 'Имя должно содержать от 2 до 3 символов.'
      ||
      (/[а-яёА-ЯЁ]/.test(field.value)) && 'Запрещено использование букв русского алфавита в имени.'
      /* ||
      checkLogin(); */
  } else if (field.id === 'password') {
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
    hint: 'Введите ваш email.',
    required: true,
  },
  nikname: {
    label: 'Отображаемое имя',
    id: 'nikname',
    value: '',
    focused: false,
    error: false,
    hint: 'Это имя увидят другие пользователи. Можно добавлять специальные символы и эмодзи.',
  },
  name: {
    label: 'Имя пользователя',
    id: 'name',
    value: '',
    focused: false,
    error: false,
    hint: 'Используйте только цифры, буквы английского алфавита, нижнее подчёркивание и точки.',
    required: true,
  },
  password: {
    label: 'Пароль',
    id: 'password',
    value: '',
    focused: false,
    error: false,
    type: 'password',
    hint: 'Минимум 8 символов.',
    required: true,
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
  border-radius: 9px;


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
      color: var(--main-text-color);
      font-size: 16px;
      line-height: 133%;
      margin-top: 20px;
      border-radius: 8px;
    }

    input {
      height: 40px;
      background-color: var(--system-back-color5);
      margin-block: 8px;
      border-radius: 8px;
    }

    a {
      font-size: 13px;
    }

    .button-reg {
      font-size: 15px;
      line-height: 171%;
      padding-block: 9px;
      margin-bottom: 12px;
      margin-top: 22px;
      border-radius: 8px;
      font-family: var(--font-family-500);
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