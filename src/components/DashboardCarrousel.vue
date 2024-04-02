<template>
  <div class="column ">
    <div class="carousel-wrapper">
      <h3>Planes</h3>
      <hr>
      <br>
      <div class="d-flex justify-content-center ">
        <div class="carousel card-container " id="content">
          <div v-for="(obj, index) in planes" :key="index" :class="{ active: index === transitionPl }" class="card">
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
          <div v-for="(obj, index) in paquetes" :key="index" :class="{ active: index === transitionPa }" class="card">
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
          <div v-for="(obj, index) in equipos" :key="index" :class="{ active: index === transitionE }" class="card">
            <p>{{ obj.title }}</p>
            <p>{{ obj.description }}</p>
            <p>{{ obj.precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch';
const client = algoliasearch('1PQI6J7XNC', 'ff63140a4095454350a92824b7994c3c');
const indexes = {
  "planes": client.initIndex('prod_telcel_planes'),
  "paquetes": client.initIndex('prod_telcel_paquetes'),
  "equipos": client.initIndex('prod_telcel_tienda')
};
const index = client.initIndex('prod_telcel_tienda');
const Equipos = [];
const results = {
  "planes": [],
  "paquetes": [],
  "equipos": []
};
export default {
  data() {
    indexes.planes.search('', {
      hitsPerPage: 4
    }).then(({ hits }) => {
      console.log('Resultados de la búsqueda de planes:', hits);
      hits.forEach(element => {
        results.planes.push(
          {
            title: element.planName,
            description: "Description for plan ",
            precio: "$ " + element.price
          }
        )
      });
    }).catch(error => {
      console.error('Error al realizar la búsqueda de planes:', error);
    });

    indexes.paquetes.search('', {
      hitsPerPage: 4
    }).then(({ hits }) => {
      console.log('Resultados de la búsqueda de paquetes:', hits);
      hits.forEach(element => {
        results.paquetes.push(
          {
            title: element.packageName,
            description: "Description for package",
            precio: "$ " + element.price
          }
        )
      });
    }).catch(error => {
      console.error('Error al realizar la búsqueda de paquetes:', error);
    });

    indexes.equipos.search('', {
      hitsPerPage: 4
    }).then(({ hits }) => {
      console.log('Resultados de la búsqueda de equipos:', hits);
      hits.forEach(element => {
        results.equipos.push(
          {
            title: element.brand + ' - ' + element.name,
            description: "Description for Card 1",
            precio: "$ " + element.productPrice
          }
        )
      });
    }).catch(error => {
      console.error('Error al realizar la búsqueda de equipos:', error);
    });
    console.log(results)
    return {
      Planes: results.planes,
      Paquetes: results.paquetes,
      Equipos: results.equipos,
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
      if (this.Paquetes.length > 4) {

      } else {

      }
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
  width: 28px;
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
  transition: opacity 0.5s ease;
  /* Transición suave de opacidad */
  opacity: 0;
  /* Ocultar todas las diapositivas al principio */
}

.carousel div.active {
  opacity: 1;
  /* Mostrar la diapositiva activa */
}

h3 {
  margin-top: 10px;
}
</style>