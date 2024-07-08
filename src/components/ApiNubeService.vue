<template>
  <div class="contenedor">
    <button @click="callExternalService" class="btn btn-primary">Servicios de Api Nube</button>

    <Modal :visible="showModal" @close="showModal = false">
      <h2>Servicios de Api Nube</h2>
      <hr>
      <div v-for="(service, index) in services" :key="index">
        <p>{{ service.titulo }}</p>
        <div v-if="service.status">
          <a :href="generateJsonLink(service.body)" target="_blank">
            <button type="button" class="btn btn-success">Success</button>
          </a>
        </div>
        <div v-else>
          <button ref="failedButton" :title="extractErrorMessage(service.body)" type="button" class="btn btn-danger" data-bs-toggle="tooltip">Failed</button>
        </div>
      </div>
    </Modal>
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
      services: []
    };
  },
  methods: {
    async callExternalService() {
      this.showModal = true;
      try {
        const response = await fetch('http://localhost:8080/api/roaming/consultar-servicios');
        const data = await response.json();
        this.services = data.map(service => ({
          titulo: service.serviceName,
          status: service.statusCode === 200,
          body: service.body,
        }));
      } catch (error) {
        this.services = [{
          titulo: 'Error',
          status: false,
          body: error.message,
          errorMessage: 'Error en la invocacion del servicio'
        }];
      }
    },
    generateJsonLink(jsonContent) {
      const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
      return URL.createObjectURL(blob);
    },
    extractErrorMessage(body) {
      const match = body.match(/\d{3}\s\w+\s\w+/);
      if (match) {
        return match[0];
      } else {
        return 'Error al obtener el codigo de respuesta';
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.contenedor {
  padding: 150px;
}
button {
  margin-bottom: 10px;
}
</style>
