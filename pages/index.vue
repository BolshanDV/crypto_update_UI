<template>
  <div
    v-if="!mobileScreen"
    class="main">
    <div class="main_item">
      <Main/>
    </div>
    <div class="main_item">
      <Tools/>
    </div>
    <div class="main_item ">
      <Advantages/>
    </div>
    <div class="main_item">
      <FAQ/>
    </div>
    <div class="main_item success_section">
      <Success/>
    </div>
  </div>
  <div
    v-else
    class="main"
  >
    <div class="main_item">
      <main-mobile/>
    </div>
    <div class="main_item tools_section">
      <tools-mobile/>
    </div>
    <div class="main_item ">
      <advantages-mobile/>
    </div>
<!--    <div class="main_item">-->
<!--      <success-mobile/>-->
<!--      <Success/>-->
<!--    </div>-->
    <div class="main_item success_section">
      <success-mobile/>
    </div>
  </div>
</template>

<script>
import Main from "~/components/index/Main.vue";
import Tools from "~/components/index/Tools.vue";
import Advantages from "~/components/index/Advantages.vue";
import FAQ from "~/components/index/FAQ.vue";
import Success from "~/components/index/Success.vue";
import Sidebar from "@/components/UIComponents/sidebar.vue";
import MainMobile from "@/components/index/mobile-index/main-mobile.vue";
import ToolsMobile from "@/components/index/mobile-index/tools-mobile.vue";
import AdvantagesMobile from "@/components/index/mobile-index/advantages-mobile.vue";
import SuccessMobile from "@/components/index/mobile-index/success-mobile.vue";

export default {
  name: 'IndexPage',
  components: {
    SuccessMobile,
    AdvantagesMobile,
    ToolsMobile,
    MainMobile,
    Sidebar,
    Success,
    FAQ,
    Advantages,
    Tools,
    Main
  },
  data() {
    return {
      mobileScreen: false
    }
  },
  beforeMount() {
    this.checkingScreen()
  },
  methods: {
    checkingScreen() {
      this.mobileScreen = window.innerWidth < 850;
    }

  }
}
</script>

<style scoped>

Main {
  z-index: 100;
}

.main_item {
  margin: 15% 0 0;
  padding: 0 5%;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.main_item:first-child {
  margin: 12vh 0 0;
  padding: 0 5%;
}

.main_item:last-child {
  margin: 15% 0 10%;
  padding: 0;
}

.success_section {
  /*padding: 0 0 9%;*/
  margin: 10% 0 0;
  width: 100vw;
}
.tools_section{
  padding: 0;
}
@media screen and (max-width: 850px) {

  .main_item:first-child {
    margin: 50px 0 0;
    padding: 0 6%;
  }

  .main_item {
    margin: 150px 0 0;
  }
  .success_section{
    margin: 250px 0 50px;

  }
}
</style>
