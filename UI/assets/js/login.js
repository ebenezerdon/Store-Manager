// const loginUser = () => {
//   const emailaddress = document.getElementById('emailaddress').value;
//   const password = document.getElementById('password').value;
//   fetch('https://newstoremanager.herokuapp.com/api/v1/auth/login', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json, text/plain, */*',
//       'content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       emailaddress: emailaddress,
//       password: password,
//     }),
//   }).then(res => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.status === 200) {
//         localStorage.setItem('accesstoken', `${data.data}`);
//       }
//     });
// };

// document.getElementById('login').addEventListener('submit', loginUser);
const loginDetails = {
  emailaddress: document.getElementById('emailaddress').value,
  password: document.getElementById('password').value,
};

const options = {
  method: 'POST',
  body: JSON.stringify(loginDetails),
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
};

const loginUser = (e) => {
  e.preventDefault();
  fetch('https://newstoremanager.herokuapp.com/api/v1/auth/login', options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

document.getElementById('login').addEventListener('submit', loginUser);