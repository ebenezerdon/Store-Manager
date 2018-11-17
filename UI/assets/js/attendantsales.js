const url = 'https://newstoremanager.herokuapp.com/api/v1';
const { attendantId } = localStorage;

const getUserProfile = () => {
  fetch(`${url}/users/${attendantId}`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      const output = `
        <figure class="profile">
          <div class="profile-image"><img src="${data.userimage}"
               alt="User Image" /></div>
          <figcaption>
            <h3>${data.fullname}</h3>
            <h4>Store ${data.role}</h4>
          </figcaption>
        </figure>
      `;
      document.getElementById('user-profile').innerHTML += output;
    });
};

const getAttendantSales = () => {
  fetch(`${url}/sales/users/${attendantId}`, {
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
        document.getElementById('sales-record').innerHTML += output;
      });
    });
};

window.onload = getUserProfile();
window.onload = getAttendantSales();
