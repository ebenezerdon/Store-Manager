import sales from '../dummyModels/sales';

const getAllSales = (req, res) => {
  return (
    res.status(200).json(sales)
  );
};

const getOneSale = (req, res) => {
  if (sales.length < req.params.id) {
    return (
      res.status(404).json('Hi! Can you check again? There\'s no sale record with that id')
    );
  }
  return (
    res.status(200).json(sales[req.params.id - 1])
  );
};

/* Adds a sale record */
const addSale = (req, res) => {
  const sale = { // creates a new instance of Products model
    id: sales.length + 1,
    productId: req.body.productId,
    productName: req.body.productName,
    AttendantId: req.body.AttendantId,
    price: req.body.price,
    quantity: req.body.quantity,
    totalPrize: req.body.totalPrize,
    created: new Date(),
  };

  sales.push(sale);

  if (!req.body.productName && !req.body.quantity) {
    return (
      res.status(400).json('Hi! Can you try again? Your input is invalid')
    );
  }
  return (
    res.status(201).json({
      message: 'Sale record added!',
      sale,
    })
  );
};

export {
  getAllSales,
  getOneSale,
  addSale,
};