<template>
  <div id="photo-holder"  v-if='isVisible'>
    <img id='photo' v-bind:src="'/' + photo.getURL()" />
    <ControlPanel />
  </div>
</template>
<style scoped>

#photo-holder{
  background: black;
}

#photo{
  max-width: 100%;
  height: 100vh;
  display: flex;
  margin: auto;
}
</style>

<script>

import ControlPanel from './control-panel.vue'
import PhotoSample from './../../shared_models/PhotoSample'
import Touch from './../utils/Touch'

export default {
  data: function(){
    return {
      inTestingMode:false,
      photo:null
    }
  },
  components:{
    ControlPanel,
  },

  mounted(){
    // const touch = new Touch(document.getElementById('photo-holder'))
  },
  computed:{

    loginResponse(){
      return this.$store.state.loginResponse
    },

    nextPhoto(){
      return this.$store.state.nextPhoto
    },

    isVisible(){
      return this.loginResponse && this.photo
    },

    userId(){
      if(this.loginResponse)
        return this.loginResponse.getUserId()
      else
        return null
    }
  },

  watch: {
      userId(){
        if(!this.inTestingMode)
          this.getFirstPhoto()
      },

      nextPhoto(){
        this.getNextPhoto()
      }
  },


  methods:{

    async getFirstPhoto(){
      const url = this.getFirstPhotoURL()
      const response = await this.fetch(url)
      if(!response.ok) alert('error')
      else this.showPhoto(response)
    },

    getFirstPhotoURL(){
      return `/firstPhoto?id=${this.userId}`
    },

    async getNextPhoto(){
      const url = this.getNextPhotoURL()
      const response = await this.fetch(url)
      if(response.ok) this.showPhoto(response)
      else alert('Something went wrong getting the next photo.')
    },

    getNextPhotoURL(){
      return `/nextPhoto?id=${this.photo.getSampleId()}`
    },


    async showPhoto(response){
      const obj = await response.json()
      this.photo = new PhotoSample(obj)
    },

    async fetch(url){
      return await fetch(url)
    }
  },
}
</script>
