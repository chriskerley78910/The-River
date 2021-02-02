<template>
  <div id='app'>
      <LoginScreen/>
      <PhotoViewer/>
  </div>
</template>
<style scoped>
  #app{
      background: black;
  }
</style>
<script>
// note that .default is needed when using the 'require' syntax.
const LoginScreen = require('./login-screen.vue').default
const PhotoViewer = require('./photo-viewer.vue').default
export default {
    components:{
      LoginScreen,
      PhotoViewer
    }
}
</script>
