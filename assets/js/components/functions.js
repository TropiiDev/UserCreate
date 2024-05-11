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