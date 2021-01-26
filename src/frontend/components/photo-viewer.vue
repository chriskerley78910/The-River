<template>
  <div id="photo-list" >
    <div class='photo-holder' v-if='photos.length > 0 && loggedIn' v-for="p in photos" :key="p.id">
      <img class='photo' v-bind:src="'/' + p.filename" />
    </div>
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
export default {
  props:['loggedIn'],
  data: function(){
    return {
      photos:[]
    }
  },
  mounted(){
      this.loadPhotos()
  },
  methods:{

    async loadPhotos(){
      const response = await fetch('/photos')
      if(!response.ok) alert('error')
      else this.appendPhotos(response)
    },

    async appendPhotos(response){
      this.photos = await response.json()
    },
  },
}
</script>
