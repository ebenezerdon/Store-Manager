const createUser = (e) => {
  e.preventDefault();
  const userDetails = {
    fullname: document.getElementById('fullname').value,
    emailaddress: document.getElementById('emailaddress').value,
    phonenumber: document.getElementById('phonenumber').value,
    userimage: document.getElementById('userimage').value,
    password: document.getElementById('password').value,
    role: document.querySelector('input[name="role"]:checked').value,
  };
  console.log(userDetails);
  const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: new Headers({
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    }),
  };
  fetch('https://newstoremanager.herokuapp.com/api/v1/auth/signup', options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        console.log('User created!');
      }
      console.log('Not successful!');
    })
    .catch(err => console.log(err));
};

document.getElementById('add-user').addEventListener('submit', createUser);
