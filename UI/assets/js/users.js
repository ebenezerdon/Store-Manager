/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const url = 'https://newstoremanager.herokuapp.com/api/v1';
const userList = document.getElementById('user-list');
let editUser;
let editUserModal;
let deleteUser;
let confirmDeleteModal;
let closeDeleteModal;

const saveAttendantId = (id) => {
  localStorage.setItem('attendantId', id);
};

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
  console.log(localStorage.accesstoken);
  const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: new Headers({
      'Content-Type': 'application/json',
      accesstoken: localStorage.accesstoken,
    }),
  };
  console.log(options.body);
  fetch(`${url}/auth/signup`, options)
    .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
        statusMessage('The user has been successfully registered!', 'green');
        console.log('User created!');
      } else {
        statusMessage(data.message);
        console.log(data);
      }
    })
    .catch((err) => {
      statusMessage('There was an error in processing your request');
      console.log(err);
    });
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
              <td>
                <a href='attendantsales.html' onClick='saveAttendantId(${user.id})'>
                  ${user.fullname}
                </a>
              </td>
              <td>${user.emailaddress}</td>
              <td>${user.role}</td>
              <td>
                <button class="button" onclick='editUserModal(${user.id}${user.phonenumber})'>Update</button>
                <button class="button" onclick='confirmDeleteModal(${user.id})'>Delete</button>
              </td>
            </tr>
            <div class="reg edit-user-class" id="${user.id}${user.phonenumber}">
              <input type="text" class="reg-input" placeholder="Full Name" id="${user.id}editedfullname" value="${user.fullname}" required>
              <input type="text" class="reg-input" placeholder="Email Address" readonly id="${user.id}editedemailaddress" value="${user.emailaddress}" required>
              <input type="tel" class="reg-input" placeholder="Phone Number" id="${user.id}editedphonenumber" value="${user.phonenumber}" required>
              <input type="text" class="reg-input" placeholder="Password" id="${user.id}editedpassword" value="${user.password}" required>
              <input type="text" class="reg-input" placeholder="Role" id="${user.id}editedrole" value="${user.role}" required>
              <button type="submit"class="btn p-modal" onClick='editUser(${user.id})'>Update User</button>
              <a href="" class="btn p-modal" id="close-modal-btn">Close</a>
            </div>
            <div class="confirm-delete" id="${user.id}">
              <h3>Are you sure you want to delete this user?</h3>
              <button id="confirm-delete-btn" onclick='deleteUser(${user.id}); closeDeleteModal(${user.id})'>Yes</button>
              <button id="close-delete-modal" onclick="closeDeleteModal(${user.id})">No</button>
            </div>
            `;
        userList.innerHTML += output;

        editUserModal = (userId) => {
          console.log(userId);
          document.getElementById(userId).style.display = 'block';
        };
        editUser = (userId) => {
          const editedUserDetails = {
            fullname: document.getElementById(`${userId}editedfullname`).value,
            emailaddress: document.getElementById(`${userId}editedemailaddress`).value,
            phonenumber: document.getElementById(`${userId}editedphonenumber`).value,
            userimage: user.userimage,
            password: document.getElementById(`${userId}editedpassword`).value,
            role: document.getElementById(`${userId}editedrole`).value,
          };
          console.log(editedUserDetails);
          console.log(localStorage.accesstoken);
          const options = {
            method: 'PUT',
            body: JSON.stringify(editedUserDetails),
            headers: new Headers({
              'Content-Type': 'application/json',
              accesstoken: localStorage.accesstoken,
            }),
          };
          console.log(options.body);
          console.log(userId);
          fetch(`${url}/users/${userId}`, options)
            .then(res => res.json())
            .then((data) => {
              if (data) {
                statusMessage('The user has been successfully updated', 'green');
                console.log('Edit User successful!');
                console.log(data);
              } else {
                statusMessage('There was an error in editing this user!');
                console.log('Edit User Not successful!'); 
              }
            })
            .catch((err) => {
              statusMessage('There was an error in processing your request');
              console.log(err);
            });
        };

        confirmDeleteModal = (userId) => {
          console.log(userId);
          document.getElementById(userId).style.display = 'block';
        };
        closeDeleteModal = (productId) => {
          document.getElementById(productId).style.display = 'none';
        };

        deleteUser = (userId) => {
          const options = {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json',
              accesstoken: localStorage.accesstoken,
            }),
          };
          fetch(`${url}/users/${userId}`, options)
            .then(res => res.json())
            .then((data) => {
              if (data.success === true) {
                statusMessage('The user has been successfully deleted!');
                console.log(`User with id ${userId} deleted!`);
                window.location = window.location;
              } else {
                statusMessage(data.message);
                console.log('Not successful!\n', data); 
              }
            })
            .catch((err) => {
              statusMessage('There was an error in processing your request');
              console.log(err);
            });
        };
      });
    })
    .catch((err) => {
      statusMessage('There was an error in processing your request');
      console.log(err);
    });
};

if (document.title === 'Add New User') {
  document.getElementById('add-user').addEventListener('submit', createUser);
}
