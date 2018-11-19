const logoutButton = document.getElementById('logout-button');

const checkLoginstatus = () => {
  if (!localStorage.accesstoken) {
    window.location.replace('./index.html');
  }
};

const logout = () => {
  alert('Hey!');
  localStorage.removeItem('accesstoken');
};

window.onload = checkLoginstatus;
logoutButton.addEventListener('click', logout);
