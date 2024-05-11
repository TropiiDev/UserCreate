import { app } from "./components/firebase.js";
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

const auth = getAuth();
const logoutBtnSubmit = document.querySelector('.logout-btn');

logoutBtnSubmit.addEventListener('click', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      signOut(auth).then(() => {
        alert('User has been signed out!');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      
        alert(errorMessage);
      })
    }
  })

  location.reload();
})

