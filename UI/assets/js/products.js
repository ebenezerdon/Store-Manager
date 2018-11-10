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
      data.forEach((user) => {
        console.log(user.productimage);
        output = `
          <div class='product'>
            <div class='product-item hover-effect'>
              <a href="product-item.html">
                <img src=${user.productimage} width='300'>
              </a>
              <a href='product-item.html'>
                <p>${user.productname}</p>
                <p>${user.price}</p>
              </a>
              <button>Add to cart</button>
            <div>
          </div>
        `;
        document.getElementById('products-list').innerHTML += output;
      });
      document.getElementById('products-list').innerHTML += '<div class="footer"></div>';
    });
};

window.onload = getProducts();
