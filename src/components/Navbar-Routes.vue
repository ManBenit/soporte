<template>
  <div>
    <button @click="toggleSidebar" class="md:hidden p-4 text-white bg-black fixed top-0 left-0 z-50">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <nav :class="{'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen, 'md:translate-x-0': true}" class="w-72 h-screen bg-black text-white transition-transform duration-300 fixed top-0 left-0 z-40">
      <div class=" pt-5">
        <img src="@/assets/img/gluo.png" class="block w-20 h-20 mx-auto" />
        <ul class="list-none mb-5">
          <li>
            <router-link to="/" class="nav-link block py-2.5 text-gray-300 border-b text-center border-gray-700 hover:text-lime-300" aria-current="page">
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/telcel" class="nav-link block py-2.5 text-gray-300 border-b text-center border-gray-700 hover:text-lime-300">
                <button @click.prevent="callSearchTelcel">
                    <span class="relative">Buscador - Telcel</span>
                </button>
            </router-link>
          </li>
          <li>
            <router-link to="/servicios" class="nav-link block py-2.5 text-gray-300 border-b text-center border-gray-700 hover:text-lime-300">
              Servicios
            </router-link>
          </li>
        </ul>

        <div class="absolute bottom-5 w-full text-center">
          <p class="text-gray-400">Hecho con ❤️ en Gluo</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Modal from './SearchComponent.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      isSidebarOpen: false,
      showModal: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    callSearchTelcel() {
      this.showModal = true;
    }
  },
};
</script>

<style scoped>
</style>
