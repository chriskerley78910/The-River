<template>
  <div v-if='!loggedIn'>
    <div>Who's viewing?</div>
    <span class='users'>
      <span class='user' v-for="p in subjects" :key="p.id">
        <span>
            photo here.
        </span>
        <span>
             {{ p.firstName }}
        </span>
      </span>
    </span>
  </div>
</template>

<style scoped>

.users{
  display: flex;
}
.user{
  width: 200pt;
  height: 200pt;
  background: black;
  color: white;
  display: flex;
  text-align-last: center;
  justify-content: center;
}
</style>

<script>
const subjects = [
  {id:1,firstName:'Mike'},
  {id:2,firstName:'Carolyn'},
  {id:3,firstName:'Chris'}
]
export default{
  props:['loggedIn'],
  data:function(){
    return {
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
    }
  }
}
</script>
