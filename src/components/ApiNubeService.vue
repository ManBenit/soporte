<template>
  <div>
    <button @click="callExternalService" class="btn btn-primary">Api Nube Services</button>
    <div v-if="status">
        <button type="button" class="btn btn-success">Success</button>
    </div>
    <div v-else-if="status === 'false'">
            <button type="button" class="btn btn-danger">Fallo</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:null,
    };
  },
  methods: {
    async callExternalService() {
      try {
        const response = await fetch('http://localhost:8080/api/roaming/tarifasTerrestre');
        const data = await response.json();
        console.log(data);
        if(data.success){
            this.status = true;
        }else{
            this.status = 'false';
        }

      } catch (error) {
        this.status = 'false';
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
</style>