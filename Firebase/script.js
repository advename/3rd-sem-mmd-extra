//==============================================================
//==============================================================
// Code needed to initialize firebase
//==============================================================
//==============================================================
// Initialize Firebase
const config = {
  apiKey: "AIzaSyD650HeiG7nByK-mPPDwWI57NrTLZ_7LXU",
  authDomain: "kea-mmd-example.firebaseapp.com",
  databaseURL: "https://kea-mmd-example.firebaseio.com",
  projectId: "kea-mmd-example",
  storageBucket: "kea-mmd-example.appspot.com",
  messagingSenderId: "792385134247"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

//==============================================================
//==============================================================
//Our own code to play around with firebase :-)
//==============================================================
//==============================================================
const logoutButton = document.querySelector("#logout");

const signUpEmail = document.querySelector("#signup input[type='email']");
const signUpPassword = document.querySelector("#signup input[type='password']");
const signUpButton = document.querySelector("#signup .submit");
const signUpMsg = document.querySelector("#signup p");

const loginEmail = document.querySelector("#login input[type='email']");
const loginPassword = document.querySelector("#login input[type='password']");
const loginButton = document.querySelector("#login .submit");
const loginMsg = document.querySelector("#login p");

const todo = document.querySelector("#addTodo input[type='text']");
const addTodo = document.querySelector("#add-todo input[type='submit']");

const todoList = document.querySelector("#todo-list ul");
const todoListMsg = document.querySelector("#todo-list p");

//Fetch todos and display them
fetchTodos();
function fetchTodos() {
  db.collection("todos")
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        todoList.innerHTML += `<li>${doc.data().title}</li>`;
        todoListMsg.textContent = "";
      });
    })
    .catch(error => {
      console.log("Xooo");
      todoListMsg.textContent =
        "User is not allowed to see data. Please login!";
    });
}

//Signup new user
signUpButton.addEventListener("click", signUpUser);

function signUpUser(e) {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then(() => {
      console.log("Succesfull signup");
      signUpMsg.textContent = "Signup Successfull";
      fetchTodos();
    })
    .catch(function(error) {
      console.log(error);
      signUpMsg.textContent = "Signup error: " + error.message;
    });
}

//Login user
loginButton.addEventListener("click", loginUser);

function loginUser(e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(() => {
      console.log("Succesfull login");
      loginMsg.textContent = "Login Successfull";
      fetchTodos();
    })
    .catch(function(error) {
      console.log(error);
      loginMsg.textContent = "Login error: " + error.message;
    });
}

//Add new todo
addTodo.addEventListener("click", createNewTodo);

function createNewTodo(e) {
  e.preventDefault();
  db.collection("todos")
    .add({
      title: todo.value
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      todoList.innerHTML += `<li>${todo.value}</li>`;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

//Logout user
logoutButton.addEventListener("click", logoutUser);

function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Succesfull logout");
    })
    .catch(function(error) {
      // An error happened.
      console.log(err);
      l;
    });
}
