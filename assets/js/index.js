import { app } from "./components/firebase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const signedInText = document.querySelector('.signed-in');
const logoutBtn = document.getElementById('logout-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName;
    const email = user.email;

    registerBtn.style.display = 'none';
    loginBtn.style.display = 'none';
    if (user.displayName === null) {
      signedInText.innerHTML = email;
    } else {
      signedInText.innerHTML = displayName;
    }
  } else {
    logoutBtn.style.display = 'none';
  }
})