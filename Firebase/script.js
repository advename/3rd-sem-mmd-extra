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
const email = document.querySelector("input[type='email']");
const password = document.querySelector("input[type='password']");
const login = document.querySelector("#login");
const logout = document.querySelector("button");

const todo = document.querySelector("input[type='text']");
const addTodo = document.querySelector("#add-todo");
const todoList = document.querySelector("ul");

//Fetch todos and display them
fetchTodos();
function fetchTodos() {
  db.collection("todos")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        todoList.innerHTML += `<li>${doc.data().title}</li>`;
      });
    });
}

//Login user
login.addEventListener("click", authUser);

function authUser(e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log("Succesfull login");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
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
logout.addEventListener("click", logoutUser);

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
    });
}
