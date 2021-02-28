<template>
  <span class='participants'>
    <span class='subject'
          v-for="subject in participants"
          :key="subject.getId()"
          @click='loginSubject(subject)'>
      <span class='smile-holder'>
          <img :src="smile"/>
      </span>
      <span class='subject-name'>
           {{ subject.getFirstName() }}
      </span>
    </span>
  </span>
</template>
<style scoped>

.participants{
  display: flex;
  justify-content: center;
}


.subject{
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

.subject:hover{
  cursor: pointer;
  border: 3pt solid black;
}

.smile-holder{
    background: #4f4f4f;
}

.subject-name{
  font-size: 25pt;
  font-family: sans-serif;
}
</style>
<script>

import Smile from './../images/smile.png'
import Subject from './../../shared_models/Subject'
import LoginResponse from './../../shared_models/LoginResponse'
import Geolocation from './../utils/Geolocation'

export default{
  props:['participants'],
  data:function(){
    return {
      smile:Smile,
    }
  },

  mounted(){
    this.geo = new Geolocation()
  },

  methods:{

        async loginSubject(subject){
          const location = await this.geo.getLocation()
          const data =  {...subject, ...location}
          const options = this.getLoginSubjectOptions(data)
          const response = await fetch('/login', options)
          this.handleResponse(response)
        },

        async handleResponse(response){
          if(response.ok) await this.updateSubjectState(response)
          else this.handleLoginError(response)
        },

        async handleLoginError(response){
          const text = await response.text()
          console.log(text)
        },

        getLoginSubjectOptions(data){
          return {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        },

        async updateSubjectState(response){
          const obj = await response.json()
          this.$store.commit('login', new LoginResponse(obj))
        },
  }
}
</script>
