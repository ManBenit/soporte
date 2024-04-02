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
<<<<<<< HEAD
      <div class="carousel-wrapper">
        <h3>Equipos</h3>
        <hr>
        <div class="d-flex justify-content-center ">
          <div class="carousel card-container " id="content">
            <div v-for="(obj, index) in Equipos" :key="index" :class="{ active: index === transitionE }" class="card">
              <h5 class="destacado">{{ obj.destacado }}</h5>
              <p>{{ obj.title }}</p>
              <img :src="'https://www.telcel.com/'+obj.images">
              <p>{{ obj.colorN }}</p>
              <span class="card-color" :style="'background-color: ' + obj.color + ';'"></span>
              <h5 class="precio">{{ obj.precio }}</h5>    
            </div>
=======
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
>>>>>>> 523abfb3c943f61e32d4724e086e0b0153a75da0
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
<<<<<<< HEAD
    index.search('', {
  hitsPerPage: 5
}).then(({ hits }) => {
    console.log('Resultados de la búsqueda:', hits);
    hits.forEach(element => {
      Equipos.push(
        {
          destacado: element.destacados[0],
          title: element.brand+'  '+element.name,
          precio: "$" + element.productPrice,
          color: element.color,
          colorN: element.colorName,
          images: element.images
        }
      )
    });
=======
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
>>>>>>> 523abfb3c943f61e32d4724e086e0b0153a75da0
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
<<<<<<< HEAD
.destacado{
  text-align: center;
  background-color: #86e1f8b0;
}
img{
  height: 75px;
  width: 75px;
  position: absolute;
  bottom: 28px;
  left: 110px;
}
.precio{
  color:#fd2929;
  position: absolute;
  bottom: 1px;
  right: 10px;
  font-weight: bold;
}
.card-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
  position: relative;
  bottom: 1px;
  left: 1px;
}

=======
>>>>>>> 523abfb3c943f61e32d4724e086e0b0153a75da0
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
<<<<<<< HEAD
  width: 38px; 
=======
  width: 28px;
>>>>>>> 523abfb3c943f61e32d4724e086e0b0153a75da0
  margin-right: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  border-block-color: rgb(0, 150, 250);
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