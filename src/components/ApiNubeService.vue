<template>
  <div class="contenedor">
    <button @click="callExternalService" class="btn btn-primary">Servicios de Api Nube</button>

    <Modal :visible="showModal" @close="showModal = false">
      <center><h2>Servicios de Api Nube</h2></center>
      <hr>
      <div v-for="(service, index) in services" :key="index">
        <p>{{ service.titulo }}</p>
        <div v-if="service.status">
          <button type="button" class="btn btn-success">Succes</button>
        </div>
        <div v-else>
          <button title="your-tooltip-here" type="button" class="btn btn-danger">Failed</button>
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
          body: service.body
        }));
      } catch (error) {
        console.error("Error al llamar al servicio: ", error);
        this.services = data.map(service => ({
                  titulo: service.serviceName,
                  status: service.statusCode === 400,
                  body: error
                }));
      }
    }
  }
};
</script>

<style scoped>
h2{

}
.contenedor {
  padding: 150px;
}
button {
  margin-bottom: 10px;
}
</style>
