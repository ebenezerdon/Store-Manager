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
      for (let i = 0; i < 4; i++) {
        output = `
        <li><a href="attendantdashboard.html">${data[i].fullname}</a></li>
              `;
        document.getElementById('userlist').innerHTML += output;
      }
    });
};

window.onload = getUsers();
