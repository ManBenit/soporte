<template>
  <div class="column">
    <div v-for="(data, title, index) in carouselData" :key="index" class="carousel-wrapper">
      <h3>{{ title }}</h3>
      <hr>
      <div class="d-flex justify-content-center">
        <div class="carousel card-container">
          <div v-for="(item, idx) in data" :key="idx" :class="{ active: isActiveSlide(title, idx) }" class="card">
            <CardComponent :item="item" :title="title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from './CardsDash.vue';
import algoliasearch from 'algoliasearch';

const client = algoliasearch('1PQI6J7XNC', 'ff63140a4095454350a92824b7994c3c');
const indexes = {
  "planes": client.initIndex('prod_telcel_planes'),
  "paquetes": client.initIndex('prod_telcel_paquetes'),
  "equipos": client.initIndex('prod_telcel_tienda')
};
export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      carouselData: {
        Planes: [],
        Paquetes: [],
        Equipos: [],
      },
      activeSlides: {
        Planes: 0,
        Paquetes: 0,
        Equipos: 0
      },
      transitionPl: 0,
      transitionPa: 0,
      transitionE: 0,
      intervalId: null,
      intervalDuration: 2000,
    };
  },
  mounted() {
    this.fetchData();
    this.startCarousel();
  },
  methods: {
    async fetchData() {
      const promises = [
        this.fetchPlanes(),
        this.fetchPaquetes(),
        this.fetchEquipos(),
      ];
      await Promise.all(promises);
    },
    async fetchPlanes() {
      try {
        const { hits } = await indexes.planes.search('', { hitsPerPage: 5 });
        this.carouselData.Planes = hits.map(element => ({
          recommended: element.recommended,
          included: element.dataIncluded,
          minandSmsIncluded: element.socialNetworksDataIncluded,
          planName: element.planName,
          subs: element.subscriptions[0],
          precio: "$ " + element.price,
        }));
      } catch (error) {
        console.error('Error al obtener los Planes:', error);
      }
    },
    async fetchPaquetes() {
      try {
        const { hits } = await indexes.paquetes.search('', { hitsPerPage: 5 });
        this.carouselData.Paquetes = hits.map(element => ({
          packageName: element.packageName,
          megas: element.dataIncluded,
          precio: "$ " + element.price
        }));
        
      } catch (error) {
        console.error('Error al obtener los Paquetes:', error);
      }
    },
    async fetchEquipos() {
      try {
        const { hits } = await indexes.equipos.search('', { hitsPerPage: 5 });
        this.carouselData.Equipos = hits.map(element => ({
          recommended: element.destacados[0],
          title: element.brand+'  '+element.name,
          precio: "$ " + element.productPrice,
          color: element.color,
          colorN: element.colorName,
          images: element.images
        }));
        
      } catch (error) {
        console.error('Error al obtener los equipos:', error);
      }
    },
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.nextSlide('Planes');
        this.nextSlide('Equipos');
        this.nextSlide('Paquetes');
      }, this.intervalDuration);
    },
    nextSlide(type) {
      const dataLength = this.carouselData[type].length;
      if(type === 'Paquetes')
        this.activeSlides[type] = (this.activeSlides[type] + 1) % dataLength;
      this.activeSlides[type] = (this.activeSlides[type] + 3) % dataLength;
    },
    isActiveSlide(title, idx) {
      return this.activeSlides[title] === idx;
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
.card {
  width: 38px; 
  margin-right: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  border-block-color: rgb(0, 150, 250);
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 230px;
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
  opacity: 0; 
}
.carousel div.active {
  opacity: 1; 
}
</style>
