<template>
  <div class="flex h-screen overflow-hidden flex-col md:flex-row">
    <!-- Barra de Navegación -->
    <aside class="w-full md:w-64 bg-gray-800 text-white md:flex-shrink-0">
      <Navbar />
    </aside>
    <!-- Contenido principal -->
    <main class="flex-1 bg-gray-100 p-10">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar-Routes.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
</style>
