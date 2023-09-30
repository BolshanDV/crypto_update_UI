<template>
  <div>
    <img src="../../assets/images/navbar/logo.svg" alt="" class="logo">
  </div>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style scoped>
.logo {
  width: 60px;
  height: 90px;
  margin-top: 10px;
  outline: none;
}

@media screen and ( width < 850px) {
  .logo {
    width: 40px;
    height: 60px;
  }
}
</style>
