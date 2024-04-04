<template>
<!--Titulo/-->
<h5 v-if="isRecommended(item)"  class="recomendado">{{item.recommended}}</h5>
<h5 class="titulo">{{ getTitle(item) }}</h5>

<!--Planes/-->
<p v-if="item.included">Internet <strong>{{ item.included }} </strong> </p>
<p v-if="item.minandSmsIncluded">Mensajes y Minutos Incluidos <strong>{{ item.minandSmsIncluded }}</strong></p>
<span v-if="item.subs" >{{ item.subs }}</span>

<!--Precio/-->
<h6 class="price">
  <span v-if="title === 'Paquetes'" class="txt">Costo: </span>
  <span v-else class="txt">Desde: </span>
  {{ item.precio }}
</h6>

<!--Paquetes/-->
<span v-if="item.megas"> Megas sin frontera {{ item.megas }}</span>

<!--Equipos/--> 
<img v-if="item.images" :src="'https://www.telcel.com/'+item.images">
<span v-if="item.color" class="card-color" :style="'background-color: ' + item.color + ';'"></span>
</template>
  
  <script>
  export default {
    props: {
      item: Object,
      title: String,
    },
    methods: {
      isRecommended(item) {
        if(item.recommended === true)
            item.recommended = 'Recomendado';
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
.txt{
    color: #888585;
}
h3 {
    margin-top: 10px;
}
.titulo{
    color: #0A3D7E;
    font: 20px bold;
}
.card-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    position: absolute;
    left: 43px;
    bottom: 20%;
}
.recomendado{
    background-color:#e4eef0 ;
    color: #00575F!important;
    text-align: center;
    font: 14px; 
    font-family: Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif;
}
.price{
    color:#C71585;
    position: absolute;
    bottom: 1px;
    left: 100px;
    font-weight: bold;
}
img{
    height: 75px;
    width: 75px;
}
.card {
    width: 38px; 
    margin-right: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    border-block-color: rgb(0, 150, 250);
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height: 230px;
}
.internet{
    position: absolute;
    top: 28px;
    left: 5px;
}
.minutos{
    position: absolute;
    top: 28px;
    right: 5px;
}    
</style>