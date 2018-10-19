
const validateUser = (user) => {
  const validEmail = typeof user.email == 'string' &&
    user.email.trim() != '';
  const validPassword = typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;

}