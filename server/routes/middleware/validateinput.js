const validateUserInput = (req, res, next) => {
  const {
    body,
  } = req;

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
  return next();
};

const validateId = (req, res, next) => {
  if (!Number(req.params.id)) {
    return res.status(401).json('Hi! The id has to be a number');
  }
  return next();
};

const validateUserSignup = (req, res, next) => {
  const { body } = req;
  if (!String(body.fullname)) {
    return (
      res.status(400).json('The user\'s name has to be a string!')
    );
  }
  if(!body.fullname || !body.emailaddress 
    || !body.role || !body.password) {
    return res.status(400).json({
      message: 'Some details are missing. Maybe check and try again?',
      success: false
    });
  }
  return next();
};

const validateProductInput = (req, res, next) => {
  const {
    body,
  } = req;
  if (!body.productname || !body.description || !body.price || !body.quantity || !body.minallowed) {
    return (
      res.status(400).json('Hi! Some details are missing. Can you check and try again?')
    );
  }
  return next();
};

const validateSaleInput = (req, res, next) => {
  const {
    body,
  } = req;
  if (!body.productname || !body.price || !body.quantity) {
    return (
      res.status(400).json('Hi! Some details are missing. Can you check and try again?')
    );
  }
  return next();
};

export {
  validateUserSignup,
  validateUserInput,
  validateProductInput,
  validateSaleInput,
  validateId,
};
