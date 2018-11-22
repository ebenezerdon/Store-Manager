/* eslint-disable no-unused-vars */
const addStatusMessageDiv = () => {
  document.getElementsByTagName('main')[0].innerHTML += '<div id="status-msg"></div>';
  /* document.body.innerHTML += '<div id="status-msg"></div>'; */
};

const statusMessage = (text, color, top) => {
  const statusMessageDiv = document.getElementById('status-msg');
  statusMessageDiv.innerHTML = text;
  statusMessageDiv.style.background = color;
  statusMessageDiv.style.top = top;
  statusMessageDiv.style.display = 'block';
  // eslint-disable-next-line no-return-assign
  setTimeout(() => statusMessageDiv.style.display = 'none', 4000);
};

window.onload = addStatusMessageDiv();