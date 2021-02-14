<template>
<div id='tagger'>
  Who is in this photo?
  <div v-for='u in users' class='person' v-bind:class="{ selected: isSelected }">
    {{u.name}}
  </div>
</div>
</template>
<style scoped>

.person{
  background: black;
  border-radius: 50pt;
  padding: 15pt;
  margin: 4pt 0pt;
  border: 2pt solid grey;
}

.person:hover{
    background: dodgerblue;
}

.selected{
    background: dodgerblue;
}
#tagger{
  position: absolute;
  top: 0pt;
  right: 0pt;
  width: fit-content;
  padding: 15pt;
  color: white;
  font-family: sans-serif;
  font-size: 14pt;
}
</style>

<script>

export default {
  props:['photoSample'],
  data:function(){
    return {
      users:photoSample.getSelectableUsers()
    }
  }
}
</script>
