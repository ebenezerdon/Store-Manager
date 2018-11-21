
const loginUser = (e) => {
  e.preventDefault();
  const loginDetails = {
    emailaddress: document.getElementById('emailaddress').value,
    password: document.getElementById('password').value,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(loginDetails),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
  fetch('https://newstoremanager.herokuapp.com/api/v1/auth/login', options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        localStorage.setItem('accesstoken', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.id);
        if (data.role === 'admin') {
          window.location.replace('./pages/admindashboard.html');
          return;
        }
        window.location.replace('./pages/attendantdashboard.html');
      }
    })
    .catch(err => snackbar(err));
};

document.getElementById('login').addEventListener('submit', loginUser);