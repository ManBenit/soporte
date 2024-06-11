<template>
  <div class="contenedor">

    <button @click="callExternalService" class="btn btn-primary">Api Nube Services</button>

    <Modal :visible="showModal" @close="showModal = false">
      <h2>Servicios de Api Nube</h2>

        <div v-for="item in titulos">
            <p>{{ item.title }}</p>
            <div v-if="success === 'true'">
                    <button  type="button" class="btn btn-success">Success</button>
                  </div>
                  <div v-if="failed === 'true'">
                    <button type="button" class="btn btn-danger">Failed</button>
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
      success : 'false',
      failed : 'false',
      titulos: [],
      }
  },
  methods: {
    async callExternalService() {
      this.showModal = true;
      try {
        const response = await fetch('http://localhost:8080/api/roaming/consultar-servicios');
        const data = await response.json();
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          console.log(data[i].serviceName, data[i].statusCode);
          this.titulos[i] = {title: data[i].serviceName};

          console.log(this.titulos)
          if(data[i].statusCode==200){
            this.success = 'true';
            this.failed = 'false';
          }else{
            this.success = 'false';
            this.failed = 'true';
          }
        }
      } catch {
        this.success = 'false';
        this.failed = 'true';
      }
    },
  },
};
</script>

<style scoped>
.contenedor{
    padding: 150px;
}
button {
  margin-bottom: 10px;
}
</style>