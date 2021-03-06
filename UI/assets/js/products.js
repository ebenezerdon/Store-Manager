/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const addProductDiv = document.getElementById('add-product');
const url = 'https://newstoremanager.herokuapp.com/api/v1/products';
/* const deleteProductDiv = document.getElementById('confirm-delete'); */
let deleteProduct;
let confirmDeleteModal;
let closeDeleteModal;
let editProduct;
let editProductModal;
const addProductBtn = document.getElementById('add-product-btn');
const productsList = document.getElementById('products-list');
const addProductModal = () => {
  addProductDiv.style.display = 'block';
};
const closeProductModal = () => {
  addProductDiv.style.display = 'none';
};

// eslint-disable-next-line no-unused-vars
const saveProductId = (id) => {
  localStorage.setItem('productId', id);
};

const getProducts = () => {
  fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      data.reverse().forEach((product) => {
        output = `
          <div class='product'>
            <div class='product-item hover-effect'>
              <a href="product-item.html" onClick='saveProductId(${product.id})'>
                <img src=${product.productimage} width='300'>
              </a>
              <a href='product-item.html' onClick='saveProductId(${product.id})'>
                <p>${product.productname}</p>
                <p>${product.price}</p>
                <p>${product.id}</p>
              </a>
              <button class="cart-btn">Add to cart</button>
              <div class='edit-product-div'>
                <button class='edit-product' onclick='editProductModal(${product.id}${product.quantity})'>Edit</button>
                <button class='delete-product' onclick='confirmDeleteModal(${product.id})'>Delete</button>
              </div>
            <div>
          </div>
          <form class="reg edit-product-class" id="${product.id}${product.quantity}">
            <input type="text" class="reg-input" placeholder="Product Name" id="editproductname" value="${product.productname}">
            <input type="text" class="reg-input" placeholder="Description" id="editdescription" value="${product.description}">
            <input type="text" class="reg-input" placeholder="Price" id="editprice" value="${product.price}">
            <input type="number" class="reg-input" placeholder="Quantity" id="editquantity" value="${product.quantity}">
            <input type="number" class="reg-input" placeholder="Minimum quantiy allowed" id="editminallowed" value="${product.minallowed}">
            <button type="submit"class="btn p-modal" onClick='editProduct(${product.id})'>Update product</button>
            <a href="" class="btn p-modal" id="close-modal-btn">Close</a>
          </form>
          <div class="confirm-delete" id="${product.id}">
            <h3>Are you sure you want to delete this product?</h3>
            <button id="confirm-delete-btn" onclick='deleteProduct(${product.id}); closeDeleteModal(${product.id})'>Yes</button>
            <button id="close-delete-modal" onclick="closeDeleteModal(${product.id})">No</button>
          </div>
        `;
        productsList.innerHTML += output;
        const editClass = document.querySelectorAll('.edit-product-div');
        const cartBtn = document.querySelectorAll('.cart-btn');
        if (localStorage.role === 'attendant') {
          // eslint-disable-next-line no-return-assign
          editClass.forEach(x => x.style.display = 'none');
        }
        if (localStorage.role === 'admin') {
          // eslint-disable-next-line no-return-assign
          cartBtn.forEach(x => x.style.display = 'none');
        }

        editProductModal = (ProductId) => {
          document.getElementById(ProductId).style.display = 'block';
        };

        editProduct = (productId) => {
          const editProductDetails = {
            productname: document.getElementById('editproductname').value,
            description: document.getElementById('editdescription').value,
            productimage: product.productimage,
            price: document.getElementById('editprice').value,
            quantity: document.getElementById('editquantity').value,
            minallowed: document.getElementById('editminallowed').value,
          };
          console.log(editProductDetails);
          console.log(localStorage.accesstoken);
          const options = {
            method: 'PUT',
            body: JSON.stringify(editProductDetails),
            headers: new Headers({
              'Content-Type': 'application/json',
              accesstoken: localStorage.accesstoken,
            }),
          };
          console.log(options.body);
          console.log(productId);
          fetch(`${url}/${productId}`, options)
            .then(res => res.json())
            .then((data) => {
              console.log(data);
              if (data) {
                console.log('Edit Product successful!');
              } else { console.log('Edit Product Not successful!'); }
            })
            .catch((err) => {
              alert(err);
              // eslint-disable-next-line no-undef
              statusMessage('There was an error in processing your request.');
            });
        };

        confirmDeleteModal = (productId) => {
          console.log(productId);
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
          fetch(`${url}/${productId}`, options)
            .then(res => res.json())
            .then((resData) => {
              if (resData.success === true) {
                console.log(`Product with id ${productId} deleted!`);
                // eslint-disable-next-line no-undef
                statusMessage('The product has been deleted successfully!', 'green');
                productsList.innerHTML = '';
                getProducts();
              } else {
                // eslint-disable-next-line no-undef
                statusMessage(resData.message);
                console.log('Not successful!'); 
              }
            })
            .catch((err) => {
              // eslint-disable-next-line no-undef
              statusMessage('There was an error in processing your request');
              console.log(err);
            });
        };
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      statusMessage('An error occured while trying to get products');
      console.log(err);
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
  fetch(`${url}`, options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        console.log('Product created!');
        // eslint-disable-next-line no-undef
        statusMessage('The product has been added successfully!', 'green');
        productsList.innerHTML = '';
        getProducts();
      } else { console.log('Not successful!'); }
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      statusMessage('There was an error in processing your request');
      console.log(err);
    });
};

addProductBtn.addEventListener('click', addProductModal);
document.getElementById('close-modal-btn').addEventListener('click', closeProductModal);
document.getElementById('add-product').addEventListener('submit', postProduct);

window.onload = getProducts();

if (localStorage.role === 'attendant') {
  addProductBtn.style.display = 'none';
  productsList.style.marginTop = '100px';
}
