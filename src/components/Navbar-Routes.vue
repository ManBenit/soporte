<template>
  <nav id="sidebar">
    <div class="p-4 pt-5">
      <img src="@/assets/img/gluo.png" class="img" />
      <hr />
      <ul class="list-unstyled components mb-5">
        <li>
          <router-link to="/" class="nav-link" aria-current="page">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#home"></use>
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/telcel" class="nav-link ">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#table"></use>
            </svg>
            Telcel - Indices
          </router-link>
        </li>
        <li>
          <router-link to="/servicios" class="nav-link">
            <svg class="bi me-2" width="16" height="16">
              <use xlink:href="#grid"></use>
            </svg>
            Servicios
          </router-link>
        </li>
      </ul>

      <div class="footer">
        <p>Hecho con ❤️ en Gluo</p>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
#sidebar {
  width: 300px;
  height: 100vh;
  background: #000000;
  color: #fff;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
#sidebar.active {
  margin-left: -300px;
}
#sidebar .img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
#sidebar .img span {
  display: block;
}
#sidebar ul.components {
  padding: 0;
}
#sidebar ul li {
  font-size: 16px;
}
#sidebar ul li > ul {
  margin-left: 10px;
}
#sidebar ul li > ul li {
  font-size: 14px;
}
#sidebar ul li a {
  padding: 10px 0;
  display: block;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
#sidebar ul li a:hover {
  color: #d2fc51;
}
#sidebar ul li.active > a {
  background: 0 0;
  color: #d2fc51;
}

@media (max-width: 991.98px) {
  #sidebar {
    margin-left: -300px;
  }
  #sidebar.active {
    margin-left: 0;
  }
}
a[data-toggle="collapse"] {
  position: relative;
}
.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
@media (max-width: 991.98px) {
  #sidebarCollapse span {
    display: none;
  }
}
#content {
  width: 100%;
  padding: 0;
  min-height: 100vh;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.footer p {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 0;
}
</style>
