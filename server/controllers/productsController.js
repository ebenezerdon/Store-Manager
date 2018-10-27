import products from '../dummyModels/products';

/* Gets all products */
const getAllProducts = (req, res) => {
  return (
    res.status(200).json(products)
  );
};

/* Gets one from products list */
const getOneProduct = (req, res) => {
  if ((req.params.id) > products.length) {
    return (
      res.status(404).json('Hi! Can you check again? There\'s no product with that id')
    );
  }
  return (
    res.status(200).json(products[req.params.id - 1])
  );

};

/* Adds a product */
const addProduct = (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  if (!req.body.name && !req.body.price) {
    return (
      res.status(400).json('Hi! Can you try again? Your input is invalid')
    );
  }
  products.push(product);

  return (
    res.status(201).json({
      message: 'Product added!',
      product,
    })
  );

};

export {
  getAllProducts,
  getOneProduct,
  addProduct,
};
