<template>
  <div class="section">
    <div class="default-layout default-text">
      <Navbar/>
      <div class="default-layout__content background">
        <Nuxt/>
      </div>
      <div class="default-layout__footer">
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Sidebar from "@/components/UIComponents/sidebar.vue";
import {mapGetters} from "vuex";

export default {
  name: "default",
  components: {Sidebar, Footer, Navbar},
  computed: {
    ...mapGetters('sidebar', ['sidebarFlag'])
  }
}
</script>

<style scoped>
.section {
  background: #00060E;
}

.default-layout {
  background: url("@/assets/images/background/circles_footer.svg") no-repeat -20% 100%,
  url("@/assets/images/background/center_circles.svg") no-repeat 50% 50%,
  url("@/assets/images/background/dash_circles.svg") no-repeat 100% 0,
  url("@/assets/images/background/coins.svg") no-repeat 100% 5%,
  url("@/assets/images/background/wave-3.svg") no-repeat 100% 0,
  url("@/assets/images/background/wave-2.svg") no-repeat 0 85%;
}

/*.default-layout__content {*/
/*  background: url("@/assets/images/background/center_circles.svg") no-repeat 50% 50%;*/
/*  z-index: 2;*/
/*}*/


@media screen and (width < 850px) {
  .default-layout {
    position: relative;
    /*background: url("@/assets/images/background/wave-3.svg") no-repeat 80% 0;*/
    z-index: 1;
  }

  .default-text {
    background: #00060E
  }

  .default-layout {
    background: url("@/assets/images/background/center_circles.svg") -30% 10%/600px 600px no-repeat,
    url("@/assets/images/background/mobile/discord.svg") 0 78%/300px 300px no-repeat,
    url("@/assets/images/background/mobile/mobile_coin.svg") no-repeat 100% 5%,
    url("@/assets/images/background/mobile/navbar_wav.svg") 0 0/100% auto no-repeat,
    url("@/assets/images/background/center_circles.svg") -12% 50%/800px 800px no-repeat,
    url("@/assets/images/background/circles_footer.svg") no-repeat 50% 95%/ 1800px 1800px,
    url("@/assets/images/background/mobile/crypto.svg") 0 34%/ 100% no-repeat;
  }

}
</style>
