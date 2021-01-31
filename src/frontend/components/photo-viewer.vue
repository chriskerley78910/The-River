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

import Photo from './../../shared_models/Photo'

export default {
  data: function(){
    return {
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
  mounted(){
      this.loadFirstPhoto()
  },
  methods:{

    async getNextPhoto(){
      const url = this.getNextPhotoURL()
      const response = await fetch(url)
      if(response.ok) this.showPhoto(response)
      else alert('Something went wrong getting the next photo.')
    },

    getNextPhotoURL(){
      return `/nextPhoto?id=${this.userId}&cur_photo_id=${this.photo.getId()}`
    },

    async loadFirstPhoto(){
      const url = this.getQueryURL()
      const response = await fetch(url)
      if(!response.ok) alert('error')
      else this.showPhoto(response)
    },

    getQueryURL(){
      return `/firstPhoto?id=${this.userId}`
    },

    async showPhoto(response){
      const obj = await response.json()
      this.photo = new Photo(obj)
    }
  },
}
</script>
