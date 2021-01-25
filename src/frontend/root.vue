<template>
  <div id='app'>
      <LoginScreen v-bind:loggedIn='loggedIn'/>
      <PhotoViewer v-bind:loggedIn='loggedIn'/>
  </div>
</template>
<script>
// note that .default is needed when using the 'require' syntax.
const LoginScreen = require('./login-screen.vue').default
const PhotoViewer = require('./photo-viewer.vue').default
export default {
    data:function(){
      return {
        loggedIn:false
      }
    },
    components:{
      LoginScreen,
      PhotoViewer
    }
}
</script>
