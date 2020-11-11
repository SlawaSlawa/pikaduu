// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name');

const listUsers = [
  {
    id: '01',
    email: 'qqq@mail.com',
    password: '12345',
    displayName: 'LenaJS'
  },
  {
    id: '02',
    email: 'www@mail.com',
    password: '123456',
    displayName: 'KateKate'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
    console.log('Выход');
  },
  signUp(email, password, handler) {
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email }
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован!');
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const toggleAuthDom = (email) => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName || getUserName(user.email);
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

const getUserName = (email) => {
  let name = [];
  email.trim();

  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      break;
    } else {
      name.push(email[i]);
    }
  }

  return name.join('');
};

console.log(getUserName('qqq@mail.ru'));

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
});

loginSignup.addEventListener('click', (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
});

toggleAuthDom();

