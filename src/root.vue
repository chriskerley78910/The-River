<template>
  <div id="example-1">
    <div v-for="p in photos" :key="p.id">
      <img style="width:100%" v-bind:src="'/' + p.filename" />
    </div>
  </div>
</template>
<script>
export default {
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
    }
  },
}
</script>
