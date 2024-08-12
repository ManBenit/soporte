<template>
  <div class="relative bg-white flex flex-col justify-between">
    <!-- Titulo -->
    <h5 v-if="isRecommended(item)" class="bg-gray-200 text-teal-700 text-center font-semibold text-sm md:text-base mb-2 p-2 rounded">
      {{ item.recommended }}
    </h5>
    <h5 class="text-blue-800 font-bold text-lg md:text-xl mb-2">
      {{ getTitle(item) }}
    </h5>

    <!-- Contenido del plan -->
    <p v-if="item.included" class="text-sm md:text-base mb-1">
      Internet <strong>{{ item.included }}</strong>
    </p>
    <p v-if="item.minandSmsIncluded" class="text-sm md:text-base mb-1">
      Mensajes y Minutos Incluidos <strong>{{ item.minandSmsIncluded }}</strong>
    </p>
    <span v-if="item.subs" class="text-sm md:text-base mb-2">{{ item.subs }}</span>

    <!-- Precio -->
    <h6 class="text-pink-700 font-bold text-xs md:text-sm mb-2">
      <span v-if="title === 'Paquetes'" class="text-gray-500">Costo: </span>
      <span v-else class="text-gray-500">Desde: </span>
      {{ item.precio }}
    </h6>

    <!-- Paquetes -->
    <span v-if="item.megas" class="block text-sm md:text-base mb-2">Megas sin frontera {{ item.megas }}</span>

    <!-- Equipos -->
    <img v-if="item.images" :src="'https://www.telcel.com/' + item.images" class="h-16 w-16 md:h-20 md:w-20 mx-auto mb-2" alt="Imagen del equipo">

    <!-- Color - Equipo -->
    <span v-if="item.color" class="absolute w-3 h-3 rounded-full bottom-2 left-2 md:bottom-3 md:left-3" :style="{ backgroundColor: item.color }"></span>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    title: String,
  },
  methods: {
    isRecommended(item) {
      if (item.recommended === true) item.recommended = 'Recomendado';
      return item.recommended;
    },
    getTitle(item) {
      return this.title === 'Planes' ? item.planName :
             this.title === 'Paquetes' ? item.packageName :
             this.title === 'Equipos' ? item.title : '';
    },
  },
};
</script>

<style scoped>
</style>
