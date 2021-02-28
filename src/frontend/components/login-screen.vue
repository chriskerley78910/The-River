<template>
  <div id='login-page' v-if='isVisible'>
    <div id='logo'>
      <img :src='logo'/>
    </div>
    <div class='login-title' v-if='hasParticipants'>
      Who's viewing?
    </div>
    <Participants v-bind:participants='participants' />
    <div class='login-title' v-if='!hasParticipants'>
      No participants available.
    </div>
  </div>
</template>

<style scoped>
#login-page{
  height: 100vh;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
}

#logo{
  display: flex;
  justify-content: space-evenly;
}

.login-title{
  color: #484848;
  font-size: 31pt;
  font-family: sans-serif;
  text-align-last: center;
  padding-bottom: 20pt;
}


</style>

<script>
import Logo from './../images/logo.png'
import Participants from './participants.vue'
import Subject from './../../shared_models/Subject'

export default {

  data:function(){
    return {
      inTestMode:false,
      logo:Logo,
      participants:[]
    }
  },

  computed:{
    isVisible(){
      return this.$store.state.loginResponse == null
    },

    hasParticipants(){
      return this.participants.length > 0
    }
  },

  components:{
    Participants
  },

  mounted(){
    if(!this.inTestMode)
      this.loadParticipants()
  },

  methods:{

    async loadParticipants(){
        const url = '/participants'
        const response = await this.fetch(url)
        this.handleResponse(response)
    },

    handleResponse(response){
      if(response.ok)
        this.setParticipants(response)
      else
        this.handleError(response)
    },

    async setParticipants(response){
      try{
        const participants = await response.json()
        this.participants = participants.map(u => new Subject(u))
      } catch(err){
        console.log(err)
      }
    },

    async handleError(response){
        const err = await response.text()
        alert(err)
    },

    async fetch(url){
      try{
        return await fetch(url)
      }catch(err){
        alert(err)
      }
    },
  }
}
</script>
