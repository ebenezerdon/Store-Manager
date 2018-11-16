const url = 'https://newstoremanager.herokuapp.com/api/v1';
const userList = document.getElementById('user-list');

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
  fetch(`${url}/auth/signup`, options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        console.log('User created!');
      }
      console.log('Not successful!');
    })
    .catch(err => console.log(err));
};

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
            <tr>
              <td>${user.fullname}</td>
              <td>${user.emailaddress}</td>
              <td>${user.role}</td>
              <td>
                <button class="button">Update</button>
                <button class="button">Delete</button>
              </td>
            </tr>
            `;
        userList.innerHTML += output;
      });
    });
};

userList.onload = getUsers();

document.getElementById('add-user').addEventListener('submit', createUser);
