<template>
  <v-app>
    <v-main>
      <Navbar />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar-Routes.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  float: left;
}
#carousel {
  float: right;
}
</style>
