const snackbar = (text) => {
  document.body.innerHTML += '<div id="status-msg"></div>';
  const statusMessageDiv = document.getElementById('status-msg');
  statusMessageDiv.innerHTML = text;
  statusMessageDiv.style.display = 'block';
  setTimeout(statusMessageDiv.style.display = 'none', 3000);
};

export default snackbar;
