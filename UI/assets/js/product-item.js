/* eslint-disable no-console */
const { productId } = localStorage;

const getProductItem = () => {
  fetch(`https://newstoremanager.herokuapp.com/api/v1/products/${productId}`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      const output = `
          <h1>${data.productname}</h1>
          <figure class="profile">
            <div class="profile-image"><img src="${data.productimage}"
                 alt="Sample photo of ${data.productname}" />
            </div>
            <figcaption>
              <p>${data.description}</p>
              <h3>Quantity in Inventory</h3>
              <h4>${data.quantity}</h4>
              <h3>Minimum Product Quantity</h3>
              <h4>${data.minallowed}</h4>
              <h3>Price</h3>
              <h4>${data.price}</h4>
              <button>Add to cart</button>
            </figcaption>
          </figure>
      `;
      document.getElementById('product-item').innerHTML += output;
    })
    .catch(err => console.log(err));
};

window.onload = getProductItem();
