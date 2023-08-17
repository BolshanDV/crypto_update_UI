<template>
  <div class="layout default-text">
    <Navbar/>
    <div class="layout__content">
      <Nuxt/>
    </div>
    <div class="layout__footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import Sidebar from "@/components/UIComponents/sidebar.vue";

export default {
  name: "second",
  components: {Sidebar, Footer, Navbar},
}
</script>

<style scoped>
.layout {
  position: relative;
  z-index: 10;
  background: url("@/assets/images/background/dash_circles.svg") 100% 15% no-repeat, url("@/assets/images/background/wave-3.svg") 100% 0%/ 100% auto no-repeat;
}

.default-text {
  background-color: #00060E;
}
.layout__content{
  margin-bottom: 20vh;
}

</style>
