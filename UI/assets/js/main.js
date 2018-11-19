const checkLoginstatus = () => {
  if (!localStorage.accesstoken) {
    window.location.replace('../index.html');
  }
};

window.onload = checkLoginstatus();
