<template>
  <div id='login-page' v-if='!loggedIn'>
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

export default{
  props:['loggedIn'],
  data:function(){
    return {
      logo:Logo,
      subjects:[]
    }
  },

  components:{
    Users
  },
  mounted(){
    this.loadSubjects()
  },

  methods:{

    async loadSubjects(){
      const response = await fetch('/subjects')
      if(response.ok) this.subjects =  await response.json()
      else alert('Unable to load subjects from the server.')
    },
  }
}
</script>
