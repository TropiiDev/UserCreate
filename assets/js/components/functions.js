import { 
  updateProfile,
  verifyBeforeUpdateEmail,
  signOut, 
  sendPasswordResetEmail
 } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

export function validateEmail (email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/; 
  
  if (expression.test(email) == true) {
    return true;
  }
  return false;
}

export function validatePassword (password) {
  if (password.length < 6) {
    return false;
  }

  return true;
}

export function updateUserImage (user, imageSrc) {
  updateProfile((user), {
    photoURL: imageSrc
  }).then(() => {
    alert('Profile has been updated');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    console.error(`Error: ${errorCode}\nError Message: ${errorMessage}`);
  })
}

export function updateUserUsername (user, username) {
  updateProfile((user), {
    displayName: username
  }).then(() => {
    alert('Profile has been updated');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    console.error(`Error: ${errorCode}\nError Message: ${errorMessage}`);
  })
}

export function updateUserEmail (auth, user, email) {
  verifyBeforeUpdateEmail(user, email)
  .then(() => {
    alert('Please verify the new email before using it.');
    signOut(auth)
    .then(() => {
      console.info('Signing out')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    
      console.error(`Error: ${errorCode}\nError Message: ${errorMessage}`);
    })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    console.error(`Error: ${errorCode}\nError Message: ${errorMessage}`);
  })
}

export function resetPassword(auth, email) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Please check your email for instructions to reset your password");
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    console.error(`Error: ${errorCode}\nError Message: ${errorMessage}`);
  })
}