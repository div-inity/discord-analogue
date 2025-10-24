import { createI18n } from 'vue-i18n'

const messages = {
  'en': {
    auth: {
      greetings: "Welcome back!",
      subgreetings: "We're so excited to see you again!",
      email: "Email or Phone Number",
      pass: "Password",
      forgotpass: "Forgot your password?",
      button: "Log In",
      registerlink: "Need an account?",
      register: "Register",
      loginwithqr: "Log in with QR Code",
      scanqr: "Scan this with the Discord mobile app to log in instantly.",
    },
    navbar: {
      mymessages: "Personal messages",
      discovery: "Discovery",
      addserver: "Add server",
    },
    sidebar: {
      sidebarsearchdialog: "Find or start a conversation",
      friends: "Friends",
      nitro: "Nitro",
      store: "Library",
      tasks: "Stage Discovery",
    },
  },
  'ru': {
    auth: {
      greetings: "С возвращением!",
      subgreetings: "Мы так рады видеть вас снова!",
      email: "Адрес электронной почты или номер телефона",
      pass: "Пароль",
      forgotpass: "Забыли пароль?",
      button: "Вход",
      registerlink: "Нужна учётная запись?",
      register: "Зарегистрироваться",
      loginwithqr: "Войдите с помощью QR-кода",
      scanqr: "Отсканируйте код с помощью мобильного приложения Discord, чтобы сразу же войти в систему.",
    },
    navbar: {
      mymessages: "Личные сообщения",
      discovery: "Путешествие",
      addserver: "Добавить сервер",
    },
    sidebar: {
      sidebarsearchdialog: "Найти или начать беседу",
      friends: "Друзья",
      nitro: "Nitro",
      store: "Магазин",
      tasks: "Задания",
    },
  }
};
const i18n = createI18n({
  legacy: false,
  locale: 'ru', // язык по умолчанию
  fallbackLocale: 'en', // резервный язык
  messages
})

export default i18n