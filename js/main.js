// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
// const regExpValidEmail = /w{1,}/;


const loginElem = document.querySelector('.login'),
  loginForm = document.querySelector('.login-form'),
  emailInput = document.querySelector('.login-email'),
  passwordInput = document.querySelector('.login-password'),
  loginSignup = document.querySelector('.login-signup'),
  userElem = document.querySelector('.user'),
  userNameElem = document.querySelector('.user-name'),
  exitElem = document.querySelector('.exit'),
  editElem = document.querySelector('.edit'),
  editBtn = document.querySelector('.edit-btn'),
  editContainer = document.querySelector('.edit-container'),
  editUsername = document.querySelector('.edit-username'),
  editPhotoURL = document.querySelector('.edit-photo'),
  userAvatarElem = document.querySelector('.user-avatar'),
  postsWrapper = document.querySelector('.posts'),
  buttonNewPost = document.querySelector('.button-new-post'),
  addPostElem = document.querySelector('.add-post');


const listUsers = [
  {
    id: '01',
    email: 'qqq@mail.com',
    password: '12345',
    displayName: 'LenaJS',
    photo: 'https://i.pinimg.com/originals/23/79/49/237949df774422804e3fec5d93dc312a.jpg'
  },
  {
    id: '02',
    email: 'www@mail.com',
    password: '123456',
    displayName: 'KateKate',
    photo: 'https://avatars.mds.yandex.net/get-zen_doc/1898210/pub_5df91a6816ef9000ae2e0920_5dfa4f2d0ce57b00aedc70e0/scale_1200'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('Email не валиден!');
      return;
    }
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      if (handler) {
        handler();
      }
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    if (handler) {
      handler();
    }
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('Email не валиден!');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.substring(0, email.indexOf('@')) };

      listUsers.push(user);
      this.authorizedUser(user);
      if (handler) {
        handler();
      }
    } else {
      alert('Пользователь с таким email уже зарегистрирован!');
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email);
  },
  authorizedUser(user) {
    this.user = user;
  },

  editUser(userName, userPhoto = '', handler) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    if (handler) {
      handler();
    }
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста 111',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизнирукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: { displayName: 'Lena', photo: 'https://avatars.mds.yandex.net/get-zen_doc/1898210/pub_5df91a6816ef9000ae2e0920_5dfa4f2d0ce57b00aedc70e0/scale_1200' },
      date: '11.11.2020, 20:54:00',
      like: 55,
      comments: 20
    },
    {
      title: 'Заголовок поста другого поста 222',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизнирукопись емубукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее'],
      author: { displayName: 'Brad', photo: 'https://i.pinimg.com/originals/23/79/49/237949df774422804e3fec5d93dc312a.jpg' },
      date: '10.110.2019, 22:11:00',
      like: 155,
      comments: 12
    }
  ],
  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map((item) => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0
    });

    if (handler) {
      handler();
    }
  }
};

const toggleAuthDom = (email) => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
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

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {



  let postsHTML = '';

  setPosts.allPosts.forEach(post => {

    const { title, text, tags, author, date, like, comments } = post;
    let tagsLink = '';

    tags.forEach(tag => {
      tagsLink += `<a href="#" class="tag">#${tag}</a>`;
    });


    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>

      <div class="tags">
        ${tagsLink}
      </div>
      <!-- /.tags -->
    </div>
    <!-- /.post-body -->
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `;
  });

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};



const init = () => {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('sumbit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible')
  });

  editBtn.addEventListener('click', (event) => {
    event.preventDefault()
  });

  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const formElements = addPostElem.elements;
    console.log('formElements: ', formElements);
    const { tags, title, text } = formElements;

    if (title.value.length < 6) {
      alert('Слишком короткий заголовок!');
      return;
    }

    if (text.value.length < 50) {
      alert('Слишком короткий пост!');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});



