const validateProductInput = (res, req, next) => {
  const { body } = req;
  if (!(body.name || body.description || body.price || body.quantity)) {
    return (
      res.status(400).json('Hi! Some details are missing. Can you check and try again?')
    );
  }
  return next();
};

export default (validateProductInput);
