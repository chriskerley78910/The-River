<template>
  <div id='login-page' v-if='isVisible'>
    <div id='logo'>
      <img :src='logo'/>
    </div>
    <div id='login-title'>Who's viewing?</div>
    <Users v-bind:subjects='subjects' />
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

#login-title{
  color: #484848;
  font-size: 31pt;
  font-family: sans-serif;
  text-align-last: center;
  padding-bottom: 20pt;
}


</style>

<script>
import Logo from './../images/logo.png'
import Users from './users.vue'

export default {

  data:function(){
    return {
      inTestMode:false,
      logo:Logo,
      subjects:[]
    }
  },

  computed:{
    isVisible(){
      return this.$store.state.loginResponse == null
    }
  },

  components:{
    Users
  },

  mounted(){
    if(!this.inTestMode)
      this.loadSubjects()
  },

  methods:{

    async loadSubjects(){
        const url = '/subjects'
        const response = await this.fetch(url)
        this.handleResponse(response)
    },

    handleResponse(response){
      if(response.ok)
        this.setSubjects(response)
      else
        this.handleError(response)
    },

    async setSubjects(response){
      this.subjects =  await response.json()
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
