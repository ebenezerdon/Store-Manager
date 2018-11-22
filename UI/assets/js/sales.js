// eslint-disable-next-line no-unused-vars
const saveAttendantId = (id) => {
  localStorage.setItem('attendantId', id);
};

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
            <td><a href='attendantsales.html' onClick='saveAttendantId(${sales.attendant_id})'>${sales.attendant_id}</a></td>
          </tr>
          `;
        document.getElementById('sales-record').innerHTML += output;
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      statusMessage('There was an error in loading sales record');
      console.log(err);
    });
};

window.onload = getSales();
