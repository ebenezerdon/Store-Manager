const addProductDiv = document.getElementById('add-product');
const addProductModal = () => {
  addProductDiv.style.display = 'block';
};
const closeProductModal = () => {
  addProductDiv.style.display = 'none';
};

const getProducts = () => {
  fetch('https://newstoremanager.herokuapp.com/api/v1/products', {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      data.forEach((product) => {
        console.log(product.productimage);
        output = `
          <div class='product'>
            <div class='product-item hover-effect'>
              <a href="product-item.html">
                <img src=${product.productimage} width='300'>
              </a>
              <a href='product-item.html'>
                <p>${product.productname}</p>
                <p>${product.price}</p>
              </a>
              <button>Add to cart</button>
              <div class='edit-product-div'>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            <div>
          </div>
        `;
        document.getElementById('products-list').innerHTML += output;
      });
      document.getElementById('products-list').innerHTML += '<div class="footer"></div>';
    });
};

const postProduct = (e) => {
  e.preventDefault();
  const productDetails = {
    productname: document.getElementById('productname').value,
    description: document.getElementById('description').value,
    productimage: document.getElementById('productimage').value,
    price: document.getElementById('price').value,
    quantity: document.getElementById('quantity').value,
    minallowed: document.getElementById('minallowed').value,
  };
  console.log(productDetails);
  console.log(localStorage.accesstoken);
  const options = {
    method: 'POST',
    body: JSON.stringify(productDetails),
    headers: new Headers({
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    }),
  };
  console.log(options.body);
  fetch('https://newstoremanager.herokuapp.com/api/v1/products', options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        console.log('Product created!');
      } else { console.log('Not successful!'); }
    })
    .catch(err => console.log(err));
};

document.getElementById('add-product-btn').addEventListener('click', addProductModal);
document.getElementById('close-modal-btn').addEventListener('click', closeProductModal);
document.getElementById('add-product').addEventListener('submit', postProduct);

window.onload = getProducts();
