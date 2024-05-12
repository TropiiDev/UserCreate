import { app } from "./components/firebase.js";
import { getAuth, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

import { validateEmail, updateUserImage, updateUserUsername, updateUserEmail, resetPassword } from "./components/functions.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const passwordResetBtn = document.querySelector('.reset-password');
    const savePreferencesBtn = document.querySelector('.submit-button');

    const imgController = document.querySelector('.img-preview');
    const imgInputField = document.getElementById('profile-img');
    const usernameInputField = document.getElementById('username');
    const emailInputField = document.getElementById('email');

    if (user.photoURL !== null) {
      const img = document.createElement("img");
      img.src = user.photoURL;
      imgController.appendChild(img);
      imgInputField.style.width = '90%';
    }

    savePreferencesBtn.addEventListener('click', () => {
      // image updater
      if (imgInputField.value !== '') {
        updateUserImage(user, imgInputField.value);
      }
      // username updater
      if (usernameInputField !== '') {
        updateUserUsername(user, usernameInputField.value);
      }

      // email updater
      if (emailInputField.value !== '') {
        if (validateEmail(emailInputField.value)) {
          updateUserEmail(auth, user, emailInputField.value);
        }
      }

      //location.reload();
    })

  } else {
    window.location.href = 'login.html';
  }
})


