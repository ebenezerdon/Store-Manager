import products from '../../models/products';

class Products {
    /* Gets all products */
    static getAll(req, res) {
        return (
            res.status(200).json(products)
        );
    }

    /* Gets one from products list */
    static getOne(req, res) {
        if ((req.params.id) > products.length ) {
            return (
                res.status(404).json
                ('Hi! Can you check again? There\'s no product with that id')
            );
        } else {
        return (
            res.status(200).json(products[req.params.id - 1])
        );}
    }

    /* Adds a product */
    static addProduct(req, res) {
        const product = new Products(); // creates a new instance of Products model
        product.id = products.length + 1;
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        products.push(product);

        return (
            res.status(201).json({
                message: 'Product added!',
                product
            })
        );
    }
  
}
  
export default Products;