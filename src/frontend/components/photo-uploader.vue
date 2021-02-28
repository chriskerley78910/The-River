<template>
  <div id="photo-uploader"  >
    <div id='upload-prompt'>Upload a family photo from the river.</div>
    <form  enctype="multipart/form-data">
    <input type="file" id="myFile" name="filename" accept="image/*" @change='uploadFile($event)'>
    <input id='submit-button' type="submit" v-if='photoLoaded' @click='submit'>
    </form>
  </div>
</template>
<style scoped>

#photo-uploader{
  background: black;
  color:white;
  position: fixed;
  bottom: 0;
  padding: 15pt;
  font-family: sans-serif;
}

#upload-prompt{
  padding-bottom: 15pt;
}
</style>
<script>
export default {
  data:function(){
    return {
      photoLoaded:false,
      photo:null
    }
  },
  methods:{
      uploadFile(e){
        this.photoLoaded = e.target.files[0]
      },
      async submit(e){
        try{
          e.preventDefault()
          const options = this.getOptions(this.photoLoaded)
          const url = '/savePhoto'
          const response = await fetch(url, options)
          this.handleResponse(response)
        }catch(err){
           // console.log(err)
          alert(err)
        }
      },



      async handleResponse(response){
        if(!response.ok){
          const err = await response.text()
          alert(err)
        }else{
          alert('Success')
        }
      },

      getOptions(file){
        return {
          method: 'POST',
          headers: {
            'Content-Type': file.type
          },
          body: file
        }
      },

  }
}
</script>
