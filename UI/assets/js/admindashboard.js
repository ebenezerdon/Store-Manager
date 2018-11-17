/* eslint-disable no-plusplus */
const url = 'https://newstoremanager.herokuapp.com/api/v1';
const saveProductId = (id) => {
  localStorage.setItem('productId', id);
};

const getCurrentUser = () => {
  fetch(`${url}/users/me`, {
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
            <a href="product-item.html" onClick='saveProductId(${data[i].id})'>
              <img src='${data[i].productimage}'
                width='300'>
            </a>
              `;
        document.getElementById('products-list').innerHTML += output;
      }
    });
};

window.onload = getCurrentUser();
window.onload = getProducts();
window.onload = getSales();
window.onload = getUsers();
