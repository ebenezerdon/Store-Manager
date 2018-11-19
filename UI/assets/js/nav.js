const nav = `
  <div class="top-nav">
    <div class="logo">
      <a href="../index.html"><img src="../assets/images/logo.png" alt=""></a>
    </div>
    <p id="logout-button">Logout</p>
    <a href="attendantdashboard.html" id="attendant-logo"><i class="far fa-user-circle"></i></a>
    <a href="admindashboard.html" id="admin-logo"><i class="far fa-user-circle"></i></a>
  </div>
  <div class="nav-2">
    <div class="wrap">
      <div class="search">
        <input type="text" class="searchTerm" placeholder="Search">
        <button type="submit" class="searchButton">
          <div class="icon"><i class="fa fa-search"></i></div>
        </button>
      </div>
    </div>
  </div>
`;
document.getElementById('navbar').innerHTML = nav;

if (localStorage.role === 'admin') {
  document.getElementById('attendant-logo').style.display = 'none';
} else {
  document.getElementById('admin-logo').style.display = 'none';
}

const logoutButton = document.getElementById('logout-button');
const logout = () => {
  localStorage.removeItem('accesstoken');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  window.location.replace('../index.html');
};

logoutButton.addEventListener('click', logout);
