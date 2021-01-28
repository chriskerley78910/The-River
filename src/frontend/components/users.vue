<template>
  <span class='users'>
    <span class='user'
          v-for="user in subjects"
          :key="user.id"
          @click='loginUser(user)'>
      <span class='smile-holder'>
          <img :src="smile"/>
      </span>
      <span class='user-name'>
           {{ user.first }}
      </span>
    </span>
  </span>
</template>
<style scoped>

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
  border: 3pt solid #f2f2f2;
}

.user:hover{
  cursor: pointer;
  border: 3pt solid black;
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

import Smile from './../images/smile.png'
import User from './../../shared_models/User'

export default{
  props:['subjects'],
  data:function(){
    return {
      smile:Smile,
    }
  },

  methods:{
        async loginUser(user){
          const options = this.getLoginUserOptions(user)
          const response = await fetch('/login', options)
          if(response.ok) await this.updateUserState(response)
          else alert('Unable to login user.')
        },

        getLoginUserOptions(user){
          return {
            method:'POST',
            body: JSON.stringify(user)
          }
        },

        async updateUserState(response){
          const obj = await response.json()
          const user = new User(obj)
          this.$store.commit('login', user)
        },
  }
}
</script>
