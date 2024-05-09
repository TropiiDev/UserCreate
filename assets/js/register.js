const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', () => {
  let inputs = document.querySelectorAll('.user-input');
  console.log(inputs);
  localStorage.setItem('email', inputs[0].innerText);
  alert(localStorage.getItem('email'));
});