import { app } from "./components/firebase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
import { addNewListItem, createNewList } from "./components/functions.js";
import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const auth = getAuth();
const pageTitle = document.getElementById('page-title');
const listAddBtn = document.querySelector('.submit-button');
const listHolder = document.getElementById('list-holder');
const listName = document.querySelector('.list-name');
const subText = document.querySelector('.subtext');
const listForm = document.getElementById('list-form');

function getListData(userId) {
  
}

/* 
gets the list name for the list
use this to update list

const db = getDatabase();
const listData = ref(db, 'lists/' + user.uid + '/list');
onValue(listData, (snapshot) => {
  const data = snapshot.val();
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      console.log(value);
    }
  }
*/

onAuthStateChanged(auth, (user) => {
  if (user) {
    pageTitle.innerHTML = `Hello there, ${user.displayName}`;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `lists/${user.uid}/list`)).then((snapshot) => {
      if (snapshot.exists()) {
        const db = getDatabase();
            const dbRef = ref(db, 'lists/' + user.uid + '/list');
            onValue(dbRef, (snapshot) => {
              const data = snapshot.val();
              for (let key in data) {
                if (data.hasOwnProperty(key)) {
                  let value = data[key];
                  listName.innerHTML = value;
                }}
            });
      } else {
        // they do not
        listHolder.style.display = 'none';
        subText.innerHTML = 'Create a new list below!';
      }
    }).catch((error) => {
      alert(error);
    });

    listAddBtn.addEventListener('click', (event) => {
      const inputValue = document.querySelector('.user-input').value;
      if (inputValue === '') {
        // do nothing
        return;
      } else {
        // check if the user has a item in the db
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lists/${user.uid}/list`)).then((snapshot) => {
          if (snapshot.exists()) {
            // they do
            // add new item to db
            addNewListItem(user.uid, inputValue);
            alert('Check the db');
          } else {
            // they do not
            listHolder.style.display = 'none';
            subText.innerHTML = 'Create a new list below!';
          }
        }).catch((error) => {
          alert(error);
        });
      }
      event.preventDefault();
    })
  } else {
    // hide any list holders
    listHolder.style.display = 'none';
    // edit subtext
    subText.innerHTML = 'Please login to add a list!';
    // remove the form to add a list
    listForm.style.display = 'none';
  }
})