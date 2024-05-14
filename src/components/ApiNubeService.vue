<template>
  <div>
    <button @click="callExternalService" class="btn btn-primary">Api Nube Services</button>
    <div v-if="success === 'true'">
        <button type="button" class="btn btn-success">Success</button>
    </div>
    <div v-if="failed === 'true'">
            <button type="button" class="btn btn-danger">Failed</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      success : 'false',
      failed : 'false',
    };
  },
  methods: {
    async callExternalService() {
      try {
        const response = await fetch('http://localhost:8080/api/roaming/tarifasTerrestre');
        const data = await response.json();
        console.log(response);
        if(response.status==200){
            this.success = 'true';
            this.failed = 'false';
        }else{
            this.success = 'false';
            this.failed = 'true';
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
button {
  margin-bottom: 10px;
}
</style>