<template>
  <div class="auth-screen">
    <form action="" class="auth-form">
      <h1 class="greetings">{{ t('auth.greetings') }}</h1>
      <p class="subgreetings">{{ t('auth.subgreetings') }}</p>

      <!-- <label for="email">{{ t('auth.email') }}<span class="require"></span></label>
      <input type="text" id="email">

      <label for="pass">{{ t('auth.pass') }}<span class="require"></span></label>
      <input type="password" id="pass"> -->
      <div v-for="field in Object.values(fields)" 
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
          @input="validateField(field)"
          v-model="field.value" />

        <Hint 
          v-show="field.error" 
          :text="field.error"
          :show="!!field.error" 
          :color="'var(--muted-notification-color)'"
          icon="info" />
      </div>

      <a href="#" class="forgot-pass">{{ t('auth.forgotpass') }}</a>
      <button class="button-auth button-purple log-in" @click="auth()">{{ t('auth.button') }}</button>


      <p class="register-link">{{ t('auth.registerlink') }} &nbsp&nbsp
        <RouterLink to="/register" class="register">{{ t('auth.register') }}
        </RouterLink>
      </p>
    </form>
    <div class="qrcode-block">
      <div class="qrcode"></div>
      <h2 class="login-with-qr">{{ t('auth.loginwithqr') }}</h2>
      <p class="scan-qr">{{ t('auth.scanqr') }}</p>
    </div>
  </div>

</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import Hint from '@/components/Hint.vue';
import { useStore } from 'vuex';
const store = useStore();
import { useRouter } from 'vue-router'
import { reactive } from 'vue';
const router = useRouter()
if (store.state.user.user != null) {
  router.push('/friends')
}

const fields = reactive({
  email: {
    label: t('auth.email'),
    value: '',
    error: '',
    //required: true,
    id: 'email',
  },
  pass:{
    label: t('auth.pass'),
    value: '',
    error: '',
    //required: true,
    id: 'pass',
    type: 'password',
  }
})
function validateForm () {
  var validated = false;
  Object.values(fields).forEach(f => {
      validated = validateField(f);
  });
  return validated; 
}


function validateField (field) {
  var validated = false;
  if (field.value == '') {
    field.error = t('auth.required');
    validated = false;
    return validated;
  } else {
    field.error = '';
    validated = true;
  }
  if (field.id === 'email') {
    field.error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ? ''
      : t('auth.mailError');
    //console.log(mail.error)
    if (field.error) validated = false;
  }
  return validated;
}

function auth () {
  if (!validateForm()) return;
  console.log("Идет авторизация")
  /* fetch('url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email: fields.email.value,
      password: fields.password.value,
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Ответ сервера:', data);
  })
  .catch(error => {
    console.error('Ошибка при POST-запросе:', error);
  }); */
}
</script>
<style lang="scss">
* {
  font-weight: 400;
}

body {
  font-family: var(--font-family-500);
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

.auth-screen {
  width: 784px;
  background-color: var(--system-back-color3);
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  column-gap: 5%;
  border-radius: 9px;

  .auth-form {
    display: flex;
    flex-direction: column;
    padding: 33px;
    border-radius: 5px;
    width: 61%;
    height: 100%;

    h1.greetings {
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

    .button-auth {
      font-size: 15px;
      line-height: 171%;
      padding-block: 9px;
      margin-bottom: 12px;
      margin-top: 22px;
      border-radius: 8px;
      font-family: var(--font-family-500);
    }

    p.register-link {
      align-self: flex-start;
      font-size: 13px;
    }
  }

  .qrcode-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 229px;
    justify-content: center;

    .qrcode {
      background-image: url(@/assets/img/qr.svg);
      background-size: contain;
      height: 174px;
      aspect-ratio: 1/1;
      border: 8px solid white;
      border-radius: 4px;
      margin-bottom: 30px;
    }

    h2 {
      font-size: 25px;
      line-height: 120%;
      text-align: center;
      color: #fff;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      line-height: 133%;
      text-align: center;
      color: var(--muted-text-color);
    }
  }
}

@media screen and (max-width: 800px) {
  html {
    height: auto;
    overflow-y: auto;

    #app {
      width: auto;
      height: auto;
    }

    .auth-screen {
      flex-direction: column;
      align-items: center;
      width: 80vw;
      margin-block: 33px;

      .auth-form {
        width: 100%;
      }

      .qrcode-block {
        padding-top: 0;
        padding-bottom: 33px;
        padding-inline: 31px;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  html {
    .auth-screen {
      flex-direction: column;
      align-items: center;
      width: 100vw;
      margin-block: 0;
      border-radius: 0;
    }
  }
}
</style>