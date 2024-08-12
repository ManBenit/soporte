<template>
  <div class="flex-auto h-screen overflow-hidden p-4">
    <div v-for="(data, title, index) in carouselData" :key="index" class="mb-5">
      <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
      <hr class="my-2 border-gray-200">
      <div class="relative flex overflow-x-auto space-x-4 snap-x snap-mandatory">
        <div v-for="(item, idx) in data" :key="idx" :class="{'opacity-100': isActiveSlide(title, idx), 'opacity-0': !isActiveSlide(title, idx)}" class="flex-none w-full md:w-60 lg:w-72 bg-white rounded-md border border-blue-400 p-4 shadow-md snap-start transition-opacity duration-500">
          <CardComponent :item="item" :title="title" />
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
          title: element.brand + ' ' + element.name,
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
      if (dataLength > 0) {
        this.activeSlides[type] = (this.activeSlides[type] + 1) % dataLength;
      }
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
</style>