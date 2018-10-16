import products from "./products";

const Sales = [
    {
      id: 1,
      productId: products[2].id,
      productName: products[2].name,
      AttendantId: 1,
      prize: products[2].prize,
      quantity: 5,
      totalPrize: 5000,
      created: new Date(),
    },
    {
      id: 2,
      productId: products[4].id,
      productName: products[4].name,
      AttendantId: 3,
      prize: products[4].prize,
      quantity: 7,
      totalPrize: 6000,
      created: new Date(),
    },
    {
      id: 3,
      productId: products[1].id,
      productName: products[1].name,
      AttendantId: 1,
      prize: products[1].prize,
      quantity: 4,
      totalPrize: 8000,
      created: new Date(),
    },
    {
      id: 4,
      productId: products[4].id,
      productName: products[4].name,
      AttendantId: 2,
      prize: products[4].prize,
      quantity: 3,
      totalPrize: 5000,
      created: new Date(),
    },
  ];
  
  export default Sales;
  