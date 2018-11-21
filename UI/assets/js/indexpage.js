/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
if (localStorage.accesstoken) {
  if (localStorage.role === 'admin') {
    window.location.replace('./pages/admindashboard.html');
  } else {
    window.location.replace('./pages/attendantdashboard.html');
  }
}

const snackbar = (text) => {
  document.body.innerHTML += '<div id="status-msg"></div>';
  const statusMessageDiv = document.getElementById('status-msg');
  statusMessageDiv.innerHTML = text;
  statusMessageDiv.style.display = 'block';
  setTimeout(() => statusMessageDiv.style.display = 'none', 4000);
};
