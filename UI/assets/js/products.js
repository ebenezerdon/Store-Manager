getProducts = () => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'accessstoken': localStorage.accesstoken,
    }),
  };
  fetch('https://newstoremanager.herokuapp.com/api/v1/products', options)
    .then(res => res.json())
    .then((data) => {
      let output = '<h2>Products</h2>';
      console.log(data);
    });
  console.log(localStorage.accesstoken);
};
