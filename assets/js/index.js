const signedIn = localStorage.getItem('signedIn');
const signedInText = document.querySelector('.signed-in');
const logoutBtn = document.getElementById('logout-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

if (!signedIn || signedIn === 'false') {
  logoutBtn.style.display = 'none';
  console.log("User has made no account");
}

if (signedIn === 'true') {
  const username = localStorage.getItem('username');
  
  registerBtn.style.display = 'none';
  loginBtn.style.display = 'none';
  
  signedInText.innerHTML = username;
}