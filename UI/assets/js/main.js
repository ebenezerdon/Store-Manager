/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
const checkLoginstatus = () => {
  if (!localStorage.accesstoken) {
    window.location.replace('../index.html');
  }
};

const snackbar = (text) => {
  document.body.innerHTML += '<div id="status-msg"></div>';
  const statusMessageDiv = document.getElementById('status-msg');
  statusMessageDiv.innerHTML = text;
  statusMessageDiv.style.display = 'block';
  setTimeout(() => statusMessageDiv.style.display = 'none', 4000);
};

window.onload = checkLoginstatus();
