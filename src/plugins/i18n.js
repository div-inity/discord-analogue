import { createI18n } from 'vue-i18n'

const messages = {
  'en': {
    reg: {
      required: 'Necessarily',
      h1: 'Create an account',
      brth: 'Date of birth',
      createAccount: 'Register',
      loginLink: 'Already registered? Login',
      mailError: 'Incorrect email address.',
      nameError1: 'The name must be between 2 and 32 characters long.',
      nameError2: 'The use of letters of the Russian alphabet in the name is prohibited.',
      passError: 'The password is too simple. Use capital letters and special characters. The minimum password length is 8 characters.',
      repassError: 'The passwords do not match.',
      dateError: 'The date is incorrect',
      mailHint: 'Enter your email.',
      nicknameHint: 'This name will be visible to other users. You can add special characters and emoji.',
      nameHint: 'Use only numbers, letters of the English alphabet, underscores, and periods.',
      passHint: 'Minimum 8 characters.',
      nicknameLabel: 'Display name',
      nameLabel: 'Username',
      passLabel: 'Password',
      repassLabel: 'Repeat password',
    },
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
    reg: {
      required: 'Обязательно',
      h1: 'Создать учётную запись',
      brth: 'Дата рождения',
      createAccount: 'Зарегистрироваться',
      loginLink: 'Уже зарегистрированы? Войти',
      mailError: 'Некорректный адрес электронной почты.',
      nameError1: 'Имя должно содержать от 2 до 32 символов.',
      nameError2: 'Запрещено использование букв русского алфавита в имени.',
      passError: 'Слишком простой пароль. Используйте заглавные буквы и спецсимволы. Минимальная длина пароля - 8 символов.',
      repassError: 'Пароли не совпадают.',
      dateError: 'Дата не корректна',
      mailHint: 'Введите ваш email.',
      nicknameHint: 'Это имя увидят другие пользователи. Можно добавлять специальные символы и эмодзи.',
      nameHint: 'Используйте только цифры, буквы английского алфавита, нижнее подчёркивание и точки.',
      passHint: 'Минимум 8 символов.',
      nicknameLabel: 'Отображаемое имя',
      nameLabel: 'Имя пользователя',
      passLabel: 'Пароль',
      repassLabel: 'Повторите пароль',
    },
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