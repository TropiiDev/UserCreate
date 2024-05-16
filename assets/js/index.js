import { app } from "./components/firebase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
import { addListData, updateListData } from "./components/functions.js";
import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const auth = getAuth();
const pageTitle = document.getElementById('page-title');
const listAddBtn = document.querySelector('.submit-button');

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

    listAddBtn.addEventListener('click', (event) => {
      const inputValue = document.querySelector('.user-input').value;
      if (inputValue === '') {
        // do nothing
        return;
      } else {
        // check if the user has a item in the db
        const dbRef = ref(getDatabase());
        get(child(dbRef, `lists/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            // they have one
            const db = getDatabase();
            const listData = ref(db, 'lists/' + user.uid + '/list');
            onValue(listData, (snapshot) => {
              const data = snapshot.val();

              for (let key in data) {
                let numKey = +key;
                console.log(numKey);
              }
            });
          } else {
            // they do not
            addListData(user.uid, inputValue);
            alert("Item has been added to your list!")
          }
        }).catch((error) => {
          console.error(error);
        });
      }

      event.preventDefault();
    })
  } else {
    console.log('There is no user logged in')
  }
})