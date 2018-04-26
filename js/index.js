const users = {} // user dictionary

/**
  *   Adds all the todos to the user model and generates the
  *   appropriate html elements to represent the list
  */
let createAndPopulateTodosList = (todos, uid, container) => {
  users[uid].todos.data = [];

  todos.forEach((todo) => {
    users[uid].todos.data.push(todo);
    let todoEl  = document.createElement("div");
    todoEl.innerHTML = todo.title;
    todoEl.classList.add("todo-item");
    if (todo.completed) $(todoEl).css("text-decoration", "line-through");
    $(`#todo-container-${uid}`).append(todoEl);
  })
}

/**
  *   Adds all the albums to the user model and generates the
  *   appropriate html elements to represent the list
  */
let createAndPopulateAlbumsList = (albums, uid, container) => {
  users[uid].albums.data = [];

  albums.forEach((album) => {
    users[uid].albums.data.push(album);
    let albumEl  = document.createElement("div");
    albumEl.innerHTML = album.title;
    albumEl.classList.add("todo-item");
    $(`#album-container-${uid}`).append(albumEl);
  })
}

/**
  *   Returns a user element as a div with the required fields as
  *   chile elements of the parent div
  *
  *   info obj { id, name, email, company }
  */
let generateUser = (info) => {
  let uid = info.id;  // copy the user id

  // start by adding the user to the user dictionary
  users[uid] = {
    name    : info.name,
    email   : info.email,
    company : info.email,
    todos   : {
                data      : undefined,
                visible   : false
              },
    albums  : {
                data      : undefined,
                visible   : false
              }
  }

  // create all the page elements
  let user             = document.createElement("div");
  let infoContainer    = document.createElement("div");
  let name             = document.createElement("h5");
  let email            = document.createElement("p");
  let company          = document.createElement("p");
  let buttonContainer  = document.createElement("div");
  let todoButton       = document.createElement("div");
  let albumButton      = document.createElement("div");
  let todoContainer    = document.createElement("section");
  let albumContainer   = document.createElement("section");

  // set up empty list containers
  todoContainer.classList.add("todo-container");
  todoContainer.id = `todo-container-${uid}`;
  albumContainer.classList.add("album-container");
  albumContainer.id = `album-container-${uid}`;

  // set up button actions
  buttonContainer.classList.add("button-container");
  todoButton.classList.add("action-button");
  todoButton.innerHTML = "Show Todo";

  $(todoButton).click(() => {
    // change button txt then hide section
    if (users[uid].todos.visible) {
      $(todoButton).text("Show Todo");
      $(todoContainer).slideToggle();
      users[uid].todos.visible = false;
      return;
    }

    users[uid].todos.visible = true;
    $(todoButton).text("Hide Todos");
    if (users[uid].albums.visible) {
      $(albumButton).text("Show Albums");
      $(albumContainer).slideToggle();
      users[uid].albums.visible = false;
    }

    // fetch data if undefined
    if (users[uid].todos.data === undefined) {
      $.get(`https://jsonplaceholder.typicode.com/todos?userId=${uid}`)
       .done((data) => {
         $(todoContainer).slideToggle();
         createAndPopulateTodosList(data, uid, todoContainer);
         $(todoContainer).slideToggle();
       })
       .fail(() => { });
    } else {
      users[uid].todos.visible = true;
      $(todoButton).text("Hide Todos");
      $(todoContainer).slideToggle();
    }
  });

  $(albumButton).click(() => {
    // change button txt then hide section
    if (users[uid].albums.visible) {
      $(albumButton).text("Show Albums");
      $(albumContainer).slideToggle();
      users[uid].albums.visible = false;
      return;
    }

    if (users[uid].todos.visible) {
      $(todoButton).text("Show Todo");
      $(todoContainer).slideToggle();
      users[uid].todos.visible = false;
    }
    users[uid].albums.visible = true;
    $(albumButton).text("Hide Albums");

    // fetch data if undefined
    if (users[uid].albums.data === undefined) {
      $.get(`https://jsonplaceholder.typicode.com/albums?userId=${uid}`)
       .done((data) => {
         $(albumContainer).slideToggle();
         createAndPopulateAlbumsList(data, uid, albumContainer);
         $(albumContainer).slideToggle();
       })
       .fail(() => { });
    } else {
      users[uid].albums.visible = true;
      $(albumButton).text("Hide Albums");
      $(albumContainer).slideToggle();
    }
  });

  albumButton.classList.add("action-button");
  albumButton.innerHTML = "Show Albums";
  $(buttonContainer).append(todoButton);
  $(buttonContainer).append(albumButton);

  user.classList.add("user");
  user.id              = `user-${info.id}`;
  name.innerHTML       = info.name;
  email.innerHTML      = `Email: ${info.email}`;
  company.innerHTML    = `Company: ${info.company}`;

  infoContainer.classList.add("info-container");
  $(infoContainer).append(name);
  $(infoContainer).append(email);
  $(infoContainer).append(company);

  $(user).append(infoContainer);
  $(user).append(buttonContainer);
  $(user).append(todoContainer);
  $(user).append(albumContainer);

  return user;
}

let populateUsers = (users) => users.forEach((user) => $('#users')
  .append(generateUser({
    id        : user.id,
    name      : user.name,
    email     : user.email,
    company   : user.company.name
  })));


$.get('https://jsonplaceholder.typicode.com/users')
 .done((data) => populateUsers(data))
 .fail(() => {  });
