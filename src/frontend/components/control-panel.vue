<template>
  <div id='tapable-area' @click='next'>
    <span id='message' v-if='promptVisible'>
      <div>
        Tap the screen see the next photo.
      </div>
      <button @click='hidePrompt($event)' id='acknowledgement'>OK</button>
    </span>
  </div>
</template>
<style scoped>

#tapable-area{
  position: fixed;
  top: 0pt;
  width: 100%;
  height: 100%;
}

#message{
  color: white;
  font-family: sans-serif;
  top: 16%;
  position: absolute;
  white-space: nowrap;
  font-size: 26pt;
  left: 50%;
  transform: translate(-50%);
  background: #0000006e;
  text-align: center;
  padding: 50pt;
  border-radius: 5pt;
}

button{
  font-size: 14pt;
  border-radius: 50pt;
  padding: 15pt;
  margin: 4pt 0pt;
  border: 2pt solid grey;
  width: 100pt;
      margin: 50pt;
}


</style>
<script>
export default {
  data:function(){
    return {
      promptVisible:true
    }
  },
  methods:{

    hidePrompt(e){
      e.stopPropagation()
      this.promptVisible = false
    },

    next(){
      this.$store.commit('nextPhoto')
    }
  }
}
</script>
