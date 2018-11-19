/* eslint-disable no-console */
const salesRecord = document.getElementById('sales-record');
salesRecord.style.marginTop = '10px';

const getAttendantSales = () => {
  fetch('https://newstoremanager.herokuapp.com/api/v1/sales/user', {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      data.forEach((sales) => {
        output = `
          <tr>
            <td>${sales.created_at}</td>
            <td>${sales.productname}</td>
            <td>${sales.quantity}</td>
            <td>${sales.price}</td>
          </tr>
          `;
        salesRecord.innerHTML += output;
      });
    })
    .catch(err => console.log(err));
};

window.onload = getAttendantSales();
