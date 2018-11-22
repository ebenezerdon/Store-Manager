if (localStorage.accesstoken) {
  if (localStorage.role === 'admin') {
    window.location.replace('./pages/admindashboard.html');
  } else {
    window.location.replace('./pages/attendantdashboard.html');
  }
}
