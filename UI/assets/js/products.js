const addProductDiv = document.getElementById('add-product');
/* const deleteProductDiv = document.getElementById('confirm-delete'); */
let deleteProduct;
let confirmDeleteModal;
let closeDeleteModal;
const addProductModal = () => {
  addProductDiv.style.display = 'block';
};
const closeProductModal = () => {
  addProductDiv.style.display = 'none';
};

/* const deleteProductModal = () => {
  deleteProductDiv.style.display = 'block';
};
const closeDeleteModal = () => {
  deleteProductDiv.style.display = 'none';
}; */

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
                <p>${product.id}</p>
              </a>
              <button>Add to cart</button>
              <div class='edit-product-div'>
                <button class='edit-product'>Edit</button>
                <button class='delete-product' onclick='confirmDeleteModal(${product.id})'>Delete</button>
              </div>
            <div>
          </div>
          <div class="confirm-delete" id="${product.id}">
            <h3>Are you sure you want to delete this product?</h3>
            <button id="confirm-delete-btn" onclick='deleteProduct(${product.id}); closeDeleteModal(${product.id})'>Yes</button>
            <button id="close-delete-modal" onclick="closeDeleteModal(${product.id})">No</button>
          </div>
        `;
        document.getElementById('products-list').innerHTML += output;

        confirmDeleteModal = (productId) => {
          document.getElementById(productId).style.display = 'block';
        };
        closeDeleteModal = (productId) => {
          document.getElementById(productId).style.display = 'none';
        };

        deleteProduct = (productId) => {
          const options = {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json',
              accesstoken: localStorage.accesstoken,
            }),
          };
          fetch(`https://newstoremanager.herokuapp.com/api/v1/products/${productId}`, options)
            .then(res => res.json())
            .then((data) => {
              if (data.success === true) {
                console.log(`Product with id ${productId} deleted!`);
              } else { console.log('Not successful!'); }
            })
            .catch(err => console.log(err));
        };
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
