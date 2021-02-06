<template>
  <div>
    <div class='button left' @click='previous'>
    </div>
    <div class='button right' @click='next'>
    </div>
  </div>
</template>
<style scoped>
.button{
  position: fixed;
  width: 56pt;
  height: 56pt;
  border: 5pt solid #dfdfdf;
  border-left: none;
  border-top: none;
}

.left{
    transform: rotate(135deg);
    bottom: 50pt;
    left: 50pt;
}

.right{
  transform: rotate(-45deg);
  bottom: 50pt;
  right: 50pt;
}
</style>
<script>
export default {
  methods:{
    previous(){
      this.$store.dispatch('nextPhoto')
    },
    next(){
      this.$store.dispatch('previousPhoto')
    }
  }
}
</script>
