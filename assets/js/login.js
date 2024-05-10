const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (event) => {
  const usernameInput = document.querySelector('#username').value;
  const passwordInput = document.querySelector('#password').value;

  const signedIn = localStorage.getItem('signedIn');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (signedIn === 'true') {
    alert('You are already logged in.')
  }

  if (
    signedIn == 'false' &&
    username == usernameInput &&
    password == passwordInput
  ) {
    localStorage.setItem('signedIn', true);
    alert(`You are now signed in ${usernameInput}`);
  } else {
    alert("Please check your username and password!")
  }

  event.preventDefault();
});