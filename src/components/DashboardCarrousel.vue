<template>
    <div class="column">
      <div class="carousel-wrapper">
        <h3>Planes</h3>
        <hr>
        <br>
        <div class="d-flex justify-content-center ">
          <div class="carousel card-container " id="content">
            <div v-for="(obj, index) in Planes" :key="index" :class="{ active: index === transitionPl }" class="card">
              <p>{{ obj.titulo }}</p>
              <p>{{ obj.description }}</p>
              <p>{{ obj.precio }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-wrapper">
        <h3>Paquetes</h3>
        <hr>
        <div class="d-flex justify-content-center ">
          <div class="carousel card-container " id="content">
            <div v-for="(obj, index) in Paquetes" :key="index" :class="{ active: index === transitionPa }" class="card">
              <p>{{ obj.titulo }}</p>
              <p>{{ obj.description }}</p>
              <p>{{ obj.precio }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-wrapper">
        <h3>Equipos</h3>
        <hr>
        <div class="d-flex justify-content-center ">
          <div class="carousel card-container " id="content">
            <div v-for="(obj, index) in Equipos" :key="index" :class="{ active: index === transitionE }" class="card">
              <p>{{ obj.titulo }}</p>
              <p>{{ obj.description }}</p>
              <p>{{ obj.precio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      Planes: [
        { titulo: 'Planes',description: "Description for Card 1",precio: 'precio' },
        { titulo: 'Planes',description: "Description for Card 2",precio: 'precio' },
        { titulo: 'Planes',description: "Description for Card 3",precio: 'precio' },
        { titulo: 'Planes',description: "Description for Card 4",precio: 'precio' },

      ],
      Paquetes: [
        { titulo: 'Paquetes',description: "Description for Card 1",precio: 'precio' },
        { titulo: 'Paquetes',description: "Description for Card 2",precio: 'precio' },
        { titulo: 'Paquetes',description: "Description for Card 3",precio: 'precio' },
        { titulo: 'Paquetes',description: "Description for Card 4",precio: 'precio' },

      ],
      Equipos: [
        { titulo: 'Equipos',description: "Description for Card 1",precio: 'precio' },
        { titulo: 'Equipos',description: "Description for Card 2",precio: 'precio' },
        { titulo: 'Equipos',description: "Description for Card 3",precio: 'precio' },
        { titulo: 'Equipos',description: "Description for Card 4",precio: 'precio' },

      ],
      transitionPl: 0,
      transitionPa: 0,
      transitionE: 0,
      intervalId: null,
      intervalDuration: 2000, // Intervalo de cambio en milisegundos
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, this.intervalDuration);
    },
    nextSlide() {
      this.transitionPl = (this.transitionPl + 1) % this.Planes.length;
      this.transitionE = (this.transitionE + 1) % this.Equipos.length;
      this.transitionPa = (this.transitionPa + 3) % this.Paquetes.length;
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>


.carousel-wrapper {
  margin-bottom: 20px; 
  margin-left: 10px;
}
#content {
  width: 100%;
  padding: 30px;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s
}
.card {
  width: 50px; 
  margin-right: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 170px;
}
.carousel {
  display: flex;
}
.card-container {
  display: flex;
  transition: transform 0.3s ease;
}
.carousel div {
  flex: 0 0 100%;
  transition: opacity 0.5s ease; /* Transición suave de opacidad */
  opacity: 0; /* Ocultar todas las diapositivas al principio */
}

.carousel div.active {
  opacity: 1; /* Mostrar la diapositiva activa */
}
h3 {
  margin-top: 10px;
}

</style>