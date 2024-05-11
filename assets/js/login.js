import { validateEmail, validatePassword } from "./components/functions.js";
import { app } from "./components/firebase.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

const auth = getAuth()

const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (event) => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (validateEmail(email) == false || validatePassword(password) == false) {
    alert(`You need an email or password`)
  }

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('Logged In')
    //window.location.href = '../index.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`Error Code: ${errorCode}\nErrorMessage: ${errorMessage}`);
  })

  event.preventDefault();
});