const url = 'https://newstoremanager.herokuapp.com/api/v1';

const getUsers = () => {
  fetch(`${url}/users`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      for (let i = 0; i < 4; i++) {
        output = `
        <li><a href="attendantdashboard.html">${data[i].fullname}</a></li>
              `;
        document.getElementById('userlist').innerHTML += output;
      }
    });
};

const getSales = () => {
  fetch(`${url}/sales`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      for (let i = 0; i < 4; i += 1) {
        output = `
        <li><a href="product-item.html">${data[i].productname}</a></li>
              `;
        document.getElementById('sale-list').innerHTML += output;
      }
    });
};

const getProducts = () => {
  fetch(`${url}/products`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      for (let i = 0; i < 4; i += 1) {
        output = `
        <a href="product-item.html">
              <img src='${data[i].productimage}'
                width='300'>
            </a>
              `;
        document.getElementById('products-list').innerHTML += output;
      }
    });
};

window.onload = getProducts();
window.onload = getSales();
window.onload = getUsers();
