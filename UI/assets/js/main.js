/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
const checkLoginstatus = () => {
  if (!localStorage.accesstoken) {
    window.location.replace('../index.html');
  }
};

window.onload = checkLoginstatus();
