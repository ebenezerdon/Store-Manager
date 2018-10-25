const validateUserInput = (res, req, next) => {
  if (req.body.fullName !== String) {
    return (
      res.status(400).json('The user\'s name has to be a string!')
    );
  }
  if (req.body.emailAdress !== String) {
    return (
      res.status(400).json('The user\'s email adress has to be a string!')
    );
  }
  if (req.body.password.length < 6) {
    return (
      res.status(400).json('The user\'s password has to be more than 6 characters!')
    );
  }
  next();
};

export default (validateUserInput);
