<template>
  <div id='login-page' v-if='!loggedIn'>
    <div id='logo'>
      <img :src='logo'/>
    </div>
    <div id='login-title'>Who's viewing?</div>
    <span class='users'>
      <span class='user'
            v-for="user in subjects"
            :key="user.id"
            @click='loginUser(user)'>
        <span class='smile-holder'>
            <img :src="smile"/>
        </span>
        <span class='user-name'>
             {{ user.firstName }}
        </span>
      </span>
    </span>
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

.users{
  display: flex;
  justify-content: center;
}
.user{
  width: 200pt;
  height: 200pt;
  background: white;
  color: #020202;
  display: flex;
  text-align-last: center;
  display: flex;
  flex-direction: column;
  margin: 15pt;
}

.smile-holder{
    background: #4f4f4f;
}

.user-name{
  font-size: 25pt;
  font-family: sans-serif;
}

</style>

<script>
import Logo from './images/logo.png'
import Smile from './images/smile.png'

const subjects = [
  {id:1,firstName:'Mike', color:'green'},
  {id:2,firstName:'Carolyn', color:'yellow'},
  {id:3,firstName:'Chris', color:'orange'}
]
export default{
  props:['loggedIn'],
  data:function(){
    return {
      logo:Logo,
      smile:Smile,
      subjects:subjects
    }
  },

  mounted(){
    this.loadSubjects()
  },

  methods:{
    async loadSubjects(){
      const response = await fetch('/subjects')
      if(response.ok) this.subjects = await response.json()
      else alert('something went wrong')
    },

    async loginUser(user){
      const url = '/login'
      const options = {
        method:'POST',
        body:JSON.stringify(user)
      }
      const response = await fetch(url, options)
    }
  }
}
</script>
