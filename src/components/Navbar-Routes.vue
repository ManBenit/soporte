<template>
<div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" id="navbar">    
    <svg class="bi me-2" width="40" height="32">
      <use xlink:href="#bootstrap"></use>
    </svg>
    <span class="fs-4">Herramienta de apoyo</span>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#home"></use>
          </svg>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/telcel" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#table"></use>
          </svg>
          Telcel - Indices
        </router-link>
      </li>
      <li>
        <router-link to="/servicios" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16">
            <use xlink:href="#grid"></use>
          </svg>
          Servicios
        </router-link>
      </li>
    </ul>
    <hr />
  </div>
  <router-view />
</template>

<style scoped>
#navbar {
  width: 250px;
  height: 100vh;
  float: left;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
}

a {
  color: #000000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
