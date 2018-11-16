const url = 'https://newstoremanager.herokuapp.com/api/v1';

const getUsers = () => {
  fetch(`${url}/users`, {
    headers: {
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    },
  })
    .then(res => res.json())
    .then((data) => {
      let output;
      data.forEach((user) => {
        output = `
        <li><a href="attendantdashboard.html">${user.fullname}</a></li>
              `;
        document.getElementById('userlist').innerHTML += output;
      });
    });
};

window.onload = getUsers();
