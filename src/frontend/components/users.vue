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

export default{
  props:['subjects'],
  data:function(){
    return {
      smile:Smile,
    }
  },

  methods:{

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
