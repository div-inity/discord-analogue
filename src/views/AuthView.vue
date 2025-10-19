<template>
  <div class="auth-screen">
    <form action="" class="auth-form">
      <h1 class="greetings">{{ t('auth.greetings') }}</h1>
      <p class="subgreetings">{{ t('auth.subgreetings') }}</p>
      <label for="email">{{ t('auth.email') }}</label>
      <input type="text" id="email">

      <label for="pass">{{ t('auth.pass') }}</label>
      <input type="password" id="pass">

      <a href="#" class="forgot-pass">{{ t('auth.forgotpass') }}</a>
      <button class="button-auth button-purple log-in">{{ t('auth.forgobuttontpass') }}</button>
      <p class="register-link">{{ t('auth.registerlink') }} &nbsp&nbsp
        <a href="#" class="register">{{ t('auth.register') }}</a>
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style lang="scss">
* {
  font-weight: 400;
}

html {
  font-family: var(--Ubuntu);
  background-image: url(@/assets/img/BackgroungAuth.svg);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.auth-screen {
  width: 784px;
  background-color: var(--system-back-color3);
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  column-gap: 5%;

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

    .button-auth {
      font-size: 14px;
      line-height: 171%;
      padding-block: 9px;
      margin-bottom: 12px;
      margin-top: 22px;
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