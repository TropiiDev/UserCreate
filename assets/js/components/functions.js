import { 
  updateProfile,
  verifyBeforeUpdateEmail,
  signOut, 
  sendPasswordResetEmail
 } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

import { getDatabase, ref, set, child, push, update, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

export function addListData(userId, listName) {
  const db = getDatabase();
  set(ref(db, 'lists/' + userId), {
    list: {
      'one': listName
    }
  });
}

export function updateListData(userId, listName) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    listName: listName
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'lists')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/lists/' + newPostKey] = postData;
  updates['/lists/' + userId + '/list' + newPostKey] = postData;

  return update(ref(db), updates);
}