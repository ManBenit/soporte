<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="relative inline-flex group">
      <button @click="callApiNubeService" class="px-10 py-2 font-bold  group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de Api Nube</span>
      </button>
    </div>
    <div class="relative inline-flex group">
      <button @click="callMTService" class="px-10 py-2 font-bold  group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de MiTelcel</span>
      </button>
    </div>
  </div>

    <!-- Modal -->
    <Modal :visible="showModal" @close="showModal = false">
      <h2 class="text-center text-lg md:text-xl font-semibold">{{ modalContent.title }}</h2>
      <hr class="my-4 border-gray-300">
      <div v-for="(service, index) in modalContent.services" :key="index" class="mb-4">
        <p class="text-base md:text-lg">{{ service.titulo }}</p>
        <div v-if="service.status">
          <a :href="generateJsonLink(service.body)" target="_blank">
            <button type="button" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Success
            </button>
          </a>
        </div>
        <div v-else>
          <button ref="failedButton" :title="extractErrorMessage(service.body)" type="button" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" data-bs-toggle="tooltip">
            Failed
          </button>
        </div>
      </div>
    </Modal>
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
        services: []
      }
    };
  },
  methods: {
    async callApiNubeService() {
      this.showModal = true;
      this.modalContent.title = 'Servicios de Api Nube';
      try {
        const response = await fetch('http://localhost:8080/api/roaming/consultar-servicios');
        const data = await response.json();
        this.modalContent.services = data.map(service => ({
          titulo: service.serviceName,
          status: service.statusCode === 200,
          body: service.body,
        }));
      } catch (error) {
        this.modalContent.services = [{
          titulo: 'Error',
          status: false,
          body: error.message,
        }];
      }
    },
    callMTService() {
      this.showModal = true;
      this.modalContent.title = 'Servicios de MiTelcel';
      this.modalContent.services = [
        {
          titulo: 'Servicio MiTelcel 1',
          status: true,
          body: { /* contenido del servicio */ }
        },
        {
          titulo: 'Servicio MiTelcel 2',
          status: false,
          body: 'Error en el servicio MiTelcel 2'
        }
      ];
    },
    generateJsonLink(jsonContent) {
      return `https://jsonviewer.stack.hu/#${encodeURIComponent(JSON.stringify(jsonContent))}`;
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