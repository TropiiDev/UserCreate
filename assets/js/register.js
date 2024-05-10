const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', () => {
  const email = document.querySelector('#email').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  localStorage.setItem('email', email);
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
});