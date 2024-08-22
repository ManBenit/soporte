<template>
  <div class="grid grid-cols-4 gap-4">

    <div class="relative inline-flex group">
      <button @click="callApiNubeService"
        :disabled="loading"
        class="active px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de Api Nube</span>
        <span v-if="loadingApiNube" class="">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </span>
      </button>
    </div>

    <div class="relative inline-flex group">
      <button @click="callMTService" class="px-10 py-2 font-bold group-hover:border-b-2 group-hover:border-lime-300">
        <span class="relative">Servicios de MiTelcel</span>
        <span v-if="loadingMtServices" class="">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </span>
      </button>
    </div>

  </div>

  <hr class="my-4 border-gray-300">

  <div class="scrollable-container">
    <div class="grid grid-cols-1 md:grid-cols-4 justify-center">

      <!-- Columna para nombre del servicio -->
      <div>
        <!--Cabecera-->
        <div class="text-center font-bold">
          <h3>Servicio</h3>
        </div>

        <!--Cuerpo-->
        <div class="">
          <div v-for="(response, index) in apiResponse.prod" :key="'servname-' + index" class="text-left mt-7">
            <div v-if="response.status">
              <div class="relative ml-5 font-semibold h-7">
                <span>{{ response.titulo }}</span>
              </div>
            </div>
            <div v-else>
              <div class="relative ml-5 font-semibold h-7">
                <span>{{ response.titulo }}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      
      <!-- Columna para PROD -->
      <div>

        <!--Cabecera-->
        <div class="text-center font-bold">
          <h3>PROD</h3>
        </div>

        <!--Cuerpo-->
        <div class="grid v-screen place-items-center">
          <div v-for="(response, index) in apiResponse.prod" :key="'prod-' + index" :value="'prod-'+response.titulo" class="text-center w-32 mt-7">
            <div v-if="response.status">
              <div class="relative h-7 bg-lime-300">
                <span>Success</span>
              </div>
              <!--px-10 py-2 font-semibold group-hover:border-b-2 group-hover:border-lime-300 relative-->
            </div>
            <div v-else>
              <div class="relative h-7 bg-red-300">
                <button ref="failedButton" :title="extractErrorMessage(response.body)" type="button" class="relative font-bold group-hover:border-b-2 w-full group-hover:border-red-300" data-bs-toggle="tooltip">
                  <span>Fail</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Columna para QA -->
      <div>

        <!--Cabecera-->
        <div class="text-center font-bold">
          <h3>QA</h3>
        </div>

        <!--Cuerpo-->
        <div class="grid v-screen place-items-center">
          <div v-for="(response, index) in apiResponse.qa" :key="'qa-' + index" :value="'qa-'+response.titulo" class="text-center w-32 mt-7">
            <div v-if="response.status">
              <div class="relative h-7 bg-lime-300">
                <span>Success</span>
              </div>
              <!--px-10 py-2 font-semibold group-hover:border-b-2 group-hover:border-lime-300 relative-->
            </div>
            <div v-else>
              <div class="relative h-7 bg-red-300">
                <button ref="failedButton" :title="extractErrorMessage(response.body)" type="button" class="relative font-bold group-hover:border-b-2 w-full group-hover:border-red-300" data-bs-toggle="tooltip">
                  <span>Fail</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Columna para el botón de comparar -->
      <div class="mb-4 mt-5">
        <div v-for="(response, index) in apiResponse.prod" :key="'compare-' + index" :value="'compare-'+response.titulo" class="flex justify-center mt-7">
          <div v-if="apiResponse.prod[index].status || apiResponse.qa[index].status">
            <div class="relative inline-flex group">
              <div class="relative font-semibold inset-x-0 flex justify-center items-center h-7">
                <button @click="compareJson(response.titulo, apiResponse.prod[index].body, apiResponse.qa[index].body)" class="relative px-10 py-2 font-semibold group-hover:border-b-2 group-hover:border-lime-600" data-bs-toggle="tooltip">
                  <span>Comparar</span>
                  <div class="absolute inset-x-0 bottom-0 h-1 bg-blue-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div><!--Div del grid de contenido-->
  </div><!--Div scrollable container-->


  <Modal :visible="showModal" @close="showModal = false">
    <h2 class="text-center text-lg md:text-xl font-semibold mb-3">{{ modalContent.title }}</h2>
    <!--Cabecera-->
    <div class="grid grid-cols-2 md:grid-cols-2 justify-center">
      <div class="text-center font-semibold">Producción</div>
      <div class="text-center font-semibold">QA</div>
    </div>

    <!--Cuerpo-->
    <div class="grid grid-cols-2 md:grid-cols-2 justify-center">
      <textarea
        ref="taBodyProd"
        readonly
        id="message"
        rows="25"
        class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
        placeholder="Respuesta recibida de producción..."
        @scroll="syncTextareaScroll('taBodyProd', 'taBodyQa')"
        :value="JSON.stringify(JSON.parse(modalContent.bodyProd), null, 2)"
      ></textarea>

      <textarea
        ref="taBodyQa"
        readonly
        id="message"
        rows="25"
        class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
        placeholder="Respuesta recibida de QA..."
        @scroll="syncTextareaScroll('taBodyQa', 'taBodyProd')"
        :value="JSON.stringify(JSON.parse(modalContent.bodyQa), null, 2)"
      ></textarea>
    </div>
  </Modal>

</template>

<script src="@/scripts/ApiNubeService.js"></script>

<style scoped>
  .scrollable-container {
    height: 100vh;
    overflow-y: auto;
  }
</style>
