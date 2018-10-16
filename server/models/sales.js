import products from "./products";

const sales = [
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
      productId: products[1].id,
      productName: products[1].name,
      AttendantId: 1,
      prize: products[1].prize,
      quantity: 5,
      totalPrize: 5000,
      created: new Date(),
    },
    {
      id: 3,
      productId: products[3].id,
      productName: products[3].name,
      AttendantId: 1,
      prize: products[3].prize,
      quantity: 5,
      totalPrize: 5000,
      created: new Date(),
    },
    {
      id: 4,
      productId: products[0].id,
      productName: products[0].name,
      AttendantId: 1,
      prize: products[0].prize,
      quantity: 5,
      totalPrize: 5000,
      created: new Date(),
    }
  ];
  
  export default sales;
  