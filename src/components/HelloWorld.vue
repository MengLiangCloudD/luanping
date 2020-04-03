<template>
  <div>
    <button @click="ce()">按钮</button>
    <loading v-show="isshowloading" class="loading"></loading>
  </div>
</template>

<script>
import http from '../utils/http'
import loading from './../common/loading'
  export default {
    components: {
      loading 
    },
    data() {
      return {
        isshowloading:false
      }
    },
    methods: {
      ce:async function(){
        var url  = 'appt/doctorList';
        var that = this;
        var data  ={
          class_id:'10101'
        }
         var res  = await http.post(that,url,data);
        debugger
      }
    },
  }
</script>

<style scoped>

</style>