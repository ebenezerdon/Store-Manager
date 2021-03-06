/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const url = 'https://newstoremanager.herokuapp.com/api/v1';
// eslint-disable-next-line no-unused-vars
const saveProductId = (id) => {
  localStorage.setItem('productId', id);
};

const getMyProfile = () => {
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
      // eslint-disable-next-line no-undef
      statusMessage(`Hello ${data.fullname.split(' ')[0]}!`, 'darkgreen', '110px');
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      statusMessage('There was an error in processing your request');
      console.log(err);
    });
};

const getSales = () => {
  fetch(`${url}/sales/user`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      let output;
      for (let i = 0; i < 4; i += 1) {
        output = `
          <li><a href="product-item.html">${data[i].productname}</a></li>
        `;
        document.getElementById('sale-list').innerHTML += output;
      }
    })
    .catch(err => console.log(err));
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

window.onload = getMyProfile();
window.onload = getProducts();
window.onload = getSales();
