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
import LoginResponse from './../../shared_models/LoginResponse'
import Geolocation from './../utils/Geolocation'

export default{
  props:['subjects'],
  data:function(){
    return {
      smile:Smile,
    }
  },

  methods:{

        async loginUser(user){
          const location = await Geolocation.getLocation()
          const data =  {...user, ...location}
          const options = this.getLoginUserOptions(data)
          const response = await fetch('/login', options)
          this.handleResponse(response)
        },

        async handleResponse(response){
          if(response.ok) await this.updateUserState(response)
          else this.handleLoginError(response)
        },

        async handleLoginError(response){
          const text = await response.text()
          console.log(text)
        },

        getLoginUserOptions(data){
          return {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        },

        async updateUserState(response){
          const obj = await response.json()
          this.$store.commit('login', new LoginResponse(obj))
        },
  }
}
</script>
