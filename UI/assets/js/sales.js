const getSales = () => {
  fetch('https://newstoremanager.herokuapp.com/api/v1/sales', {
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
            <td>${sales.attendant_id}</td>
          </tr>
          `;
        document.getElementById('sales-record').innerHTML += output;
      });
    });
};

window.onload = getSales();