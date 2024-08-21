<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="relative inline-flex group">
      <button @click="callApiNubeService" class="active px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de Api Nube</span>
      </button>
    </div>
    <div class="relative inline-flex group">
      <button @click="callMTService" class="px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de MiTelcel</span>
      </button>
    </div>
  </div>

  <hr class="my-4 border-gray-300">

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Columna para PROD -->
    <div>
      <h3 class="text-center font-semibold">PROD</h3>
      <div v-for="(service, index) in modalContent.prod" :key="'prod-' + index" class="mb-4">
        <div v-if="service.status">
          <button class="px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-lime-300 relative">
            <span class="relative z-10">{{ service.titulo }}</span>
            <div class="absolute inset-x-0 bottom-0 h-1 bg-lime-300"></div>
          </button>
        </div>
        <div v-else>
          <button ref="failedButton" :title="extractErrorMessage(service.body)" type="button" class="px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-red-300 relative" data-bs-toggle="tooltip">
            <span class="relative z-10">{{ service.titulo }}</span>
            <div class="absolute inset-x-0 bottom-0 h-1 bg-red-300"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Columna para QA -->
    <div>
      <h3 class="text-center font-semibold">QA</h3>
      <div v-for="(service, index) in modalContent.qa" :key="'qa-' + index" class="mb-4">
        <div v-if="service.status">
          <button class="px-10 py-2 font-bold group-hover:border-b-2 relative">
            <span class="relative z-10">{{ service.titulo }}</span>
            <div class="absolute inset-x-0 bottom-0 h-1 bg-lime-300"></div>
          </button>
        </div>
        <div v-else>
          <button ref="failedButton" :title="extractErrorMessage(service.body)" type="button" class="px-10 py-2 font-bold group-hover:border-b-2 relative" data-bs-toggle="tooltip">
            <span class="relative z-10">{{ service.titulo }}</span>
            <div class="absolute inset-x-0 bottom-0 h-1 bg-red-300"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Columna para el botón de comparar -->
    <div>
      <div v-for="(service, index) in modalContent.prod" :key="'compare-' + index" class="mb-4">
        <div class="relative inline-flex group">
          <button @click="compareJson()" class="px-10 py-2 font-bold group-hover:border-b-2 relative">
            <span class="relative z-10">Comparar</span>
            <div class="absolute inset-x-0 bottom-0 h-1 bg-blue-300"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './ModalE.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      modalContent: {
        title: '',
        qa: [],  // Para QA
        prod: [] // Para PROD
      }
    };
  },
  methods: {
    async callApiNubeService() {
      this.modalContent.title = 'Servicios de Api Nube';
      try {
        const response = await fetch('http://localhost:8080/api/roaming/consultar-servicios');
        const data = await response.json();
        this.modalContent.qa = data.QA.map(service => ({
          titulo: service.serviceName,
          status: service.statusCode === 200,
          body: service.body,
        }));
        this.modalContent.prod = data.PROD.map(service => ({
          titulo: service.serviceName,
          status: service.statusCode === 200,
          body: service.body,
        }));
      } catch (error) {
        this.modalContent.qa = [{
          titulo: 'Error',
          status: false,
          body: error.message,
        }];
        this.modalContent.prod = [{
          titulo: 'Error',
          status: false,
          body: error.message,
        }];
      }
    },
    callMTService() {
      this.modalContent.title = 'Servicios de MiTelcel';
      this.modalContent.qa = [
        {
          titulo: 'Servicio MiTelcel QA 1',
          status: true,
          body: { /* contenido del servicio */ }
        },
        {
          titulo: 'Servicio MiTelcel QA 2',
          status: false,
          body: 'Error en el servicio MiTelcel QA 2'
        }
      ];
      this.modalContent.prod = [
        {
          titulo: 'Servicio MiTelcel PROD 1',
          status: true,
          body: { /* contenido del servicio */ }
        },
        {
          titulo: 'Servicio MiTelcel PROD 2',
          status: false,
          body: 'Error en el servicio MiTelcel PROD 2'
        }
      ];
    },
    extractErrorMessage(body) {
      const code = body.match(/\d{3}\s\w+\s\w+/);
      const desc = body.match(/El requerimiento enviado por el cliente era sintácticamente incorrecto\./);
      if (code && desc) {
        return code[0] + ": " + desc[0];
      } else {
        return 'Error al obtener el código de respuesta';
      }
    }
  }
};
</script>

<style scoped>
</style>
