import { app } from "./components/firebase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"
import { addNewListItem, createNewList } from "./components/functions.js";
import { getDatabase, ref, child, get, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const auth = getAuth();

const mode = document.querySelectorAll('.mode');

mode.forEach((item) => {
  item.innerHTML = ''
})
