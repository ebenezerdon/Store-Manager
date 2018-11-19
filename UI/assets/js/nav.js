const nav = `
  <div class="top-nav">
    <div class="logo">
      <a href="../index.html"><img src="../assets/images/logo.png" alt=""></a>
    </div>
    <p id="logout-button">Logout</p>
    <a href="attendantdashboard.html"><i class="far fa-user-circle"></i></a>
    <a href="admindashboard.html"><i class="far fa-user-circle"></i></a>
    <a href="#"><i class="far fa-bell"></i></a>
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
