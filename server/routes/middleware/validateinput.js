const validateUserInput = (req, res, next) => {
  const { body } = req;
  /* if (null(body)) {
    return (
      res.status(400).json('Hi! You\'d have to send something')
    );
  } */
  if (!String(body.fullName)) {
    return (
      res.status(400).json('The user\'s name has to be a string!')
    );
  }
  if (!String(body.emailAddress)) {
    return (
      res.status(400).json('The user\'s email adress has to be a string!')
    );
  }
  if (body.password.length < 6) {
    return (
      res.status(400).json('The user\'s password has to be more than 6 characters!')
    );
  }
  if (!body.type) {
    return (
      res.status(400).json('There really has to be a type!')
    );
  }
  return next();
};

const validateProductInput = (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.description || !body.price || !body.quantity) {
    return (
      res.status(400).json('Hi! Some details are missing. Can you check and try again?')
    );
  }
  return next();
};

const validateSaleInput = (req, res, next) => {
  const { body } = req;
  if (!body.productName || !body.price || !body.quantity) {
    return (
      res.status(400).json('Hi! Some details are missing. Can you check and try again?')
    );
  }
  return next();
};

export { validateUserInput, validateProductInput, validateSaleInput };