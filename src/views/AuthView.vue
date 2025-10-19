<template>
  <div class="auth-screen">
    <form action="" class="auth-form">
      <h1 class="greetings">Welcome back!</h1>
      <p>We're so excited to see you again!</p>
      <label for="email">Email or Phone Number</label>
      <input type="text" id="email">

      <label for="pass">Password</label>
      <input type="password" id="pass">

      <a href="#">Forgot your password?</a>
      <button class="button-auth button-purple">Log In</button>
      <p class="register-link">Need an account? &nbsp&nbsp<a href="#">Register</a></p>
    </form>
    <div class="qrcode-block">
      <div class="qrcode"></div>
      <h2>Log in with QR Code</h2>
      <p>Scan this with the Discord mobile app to log in instantly.</p>
    </div>
  </div>
</template>
<script setup>
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
    padding-top: 43px;
    width: 229px;

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