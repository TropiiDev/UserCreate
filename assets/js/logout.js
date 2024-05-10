const logoutBtnSubmit = document.querySelector('.logout-btn');

logoutBtnSubmit.addEventListener('click', () => {
  const signedIn = localStorage.getItem('signedIn');

  if (signedIn === 'true') {
    const username = localStorage.getItem('username');

    localStorage.setItem('signedIn', false);

    alert(`You are now signed out ${username}`);
    location.reload();
  } else {
    alert(`You are not signed in.`)
  }
})