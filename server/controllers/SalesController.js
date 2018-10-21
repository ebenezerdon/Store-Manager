import sales from '../../models/sales';

class Sales {
  static getAll(req, res) {
    return (
      res.status(200).json(sales)
    );
  }

  static getOne(req, res) {
    if (sales.length < req.params.id) {
      return (
        res.status(404).json('Hi! Can you check again? There\'s no sale record with that id')
      );
    }
    return (
      res.status(200).json(sales[req.params.id - 1])
    );
  }

  /* Adds a sale record */
  static addSale(req, res) {
    const sale = new Sales(); // creates a new instance of Products model
    sale.id = sales.length + 1;
    sale.productId = req.body.productId;
    sale.productName = req.body.productName;
    sale.AttendantId = req.body.AttendantId;
    sale.price = req.body.price;
    sale.quantity = req.body.quantity;
    sale.totalPrize = req.body.totalPrize;
    sale.created = new Date();

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
  }
}

export default Sales;
