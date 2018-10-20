import products from './products';

const sales = [
  {
    id: 1,
    productId: products[2].id,
    productName: products[2].name,
    AttendantId: 1,
    price: products[2].price,
    quantity: 5,
    totalprice: 5000,
    created: new Date(),
},
{
    id: 2,
    productId: products[1].id,
    productName: products[1].name,
    AttendantId: 1,
    price: products[1].price,
    quantity: 5,
    totalPrice: 5000,
    created: new Date(),
},
{
    id: 3,
    productId: products[3].id,
    productName: products[3].name,
    AttendantId: 1,
    price: products[3].price,
    quantity: 5,
    totalprice: 5000,
    created: new Date(),
},
{
    id: 4,
    productId: products[0].id,
    productName: products[0].name,
    AttendantId: 1,
    price: products[0].price,
    quantity: 5,
    totalprice: 5000,
    created: new Date(),
}
];

export default sales;