import { app } from "./components/firebase.js";
import { resetPassword } from "./components/functions.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

const signedInText = document.querySelector('.signed-in');
const logoutBtn = document.getElementById('logout-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');


const auth = getAuth();
const passwordResetBtn = document.getElementById('resetPassword');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;

    registerBtn.style.display = 'none';
    loginBtn.style.display = 'none';
    if (user.displayName === null) {
      if (photoURL === null) {
        signedInText.innerHTML = email;
      } else {
        
      }
    } else {
      signedInText.innerHTML = displayName;
    }
    passwordResetBtn.addEventListener('click', (event) => {
      const email = user.email;
      resetPassword(auth, email)
    
      event.preventDefault();
    })
  } else {
    logoutBtn.style.display = 'none';

    passwordResetBtn.addEventListener('click', (event) => {
      const email = document.getElementById('emailReset');
      resetPassword(auth, email.value)
      alert('Clicked button');
      event.preventDefault();
    })
  }
})

