<template>
  <div class="column ">
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
            <h5 class="destacado">{{ obj.destacado }}</h5>
            <p>{{ obj.title }}</p>
            <img :src="'https://www.telcel.com/'+obj.images">
            <p>{{ obj.colorN }}</p>
            <span class="card-color" :style="'background-color: ' + obj.color + ';'"></span>
            <h5 class="precio">{{ obj.precio }}</h5>    
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch';
const client = algoliasearch('1PQI6J7XNC', 'ff63140a4095454350a92824b7994c3c');
const results = {
  "planes": [],
  "paquetes": [],
  "equipos": []
};
const indexes = {
  "planes": client.initIndex('prod_telcel_planes'),
  "paquetes": client.initIndex('prod_telcel_paquetes'),
  "equipos": client.initIndex('prod_telcel_tienda')
};
export default {
data() {
  indexes.equipos.search('', {
    hitsPerPage: 5
  }).then(({ hits }) => {
    console.log('Resultados de la búsqueda:', hits);
    hits.forEach(element => {
      results.equipos.push(
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
    console.log("result equiois", results.equipos);
  }).catch(error => {
    console.error('Error al realizar la búsqueda:', error);
  });
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
width: 38px; 
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