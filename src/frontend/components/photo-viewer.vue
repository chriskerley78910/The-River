<template>
  <div id="photo-holder"  v-if='isVisible' @click='getNextPhoto'>
    <img class='photo' v-bind:src="'/' + photo.getURL()" />
  </div>
</template>
<style scoped>
.photo-holder{
  background: black;
}

.photo{
  max-width: 100%;
  height: 100vh;
  display: flex;
  margin: auto;
}
</style>

<script>

import PhotoSample from './../../shared_models/PhotoSample'

export default {
  data: function(){
    return {
      inTestingMode:false,
      photo:null
    }
  },
  computed:{

    loginResponse(){
      return this.$store.state.loginResponse
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
      }
  },
  methods:{

    async getFirstPhoto(){
      console.log('getting the first hpto.')
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
