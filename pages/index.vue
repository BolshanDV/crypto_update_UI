<template>
  <div
    v-if="!mobileScreen"
    class="main">
    <div class="main_item">
      <Main/>
    </div>
    <div class="arrow_element">
      <div class="arrow one">
        <img src="../assets/images/index/main/arrow.svg" alt="">
      </div>
    </div>
    <div class="main_item">
      <Tools/>
    </div>
    <div class="main_item">
      <Advantages/>
    </div>
    <div class="main_item success_section_main">
      <Success/>
    </div>
    <div class="main_item">
      <FAQ/>
    </div>
  </div>
  <div
    v-else
    class="main"
  >
    <div class="main_item main_item_mobile">
      <main-mobile/>
    </div>
    <div class="main_item tools_section main_item_mobile">
      <tools-mobile/>
    </div>
    <div class="main_item main_item_mobile">
      <advantages-mobile/>
    </div>
    <!--    <div class="main_item">-->
    <!--      <success-mobile/>-->
    <!--      <Success/>-->
    <!--    </div>-->
    <div class="main_item main_item_mobile">
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
import {mapActions} from "vuex";

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
    localStorage.removeItem('referralCode')
    this.checkingScreen();
    this.getUrlParameters()

  },
  methods: {
    ...mapActions('referralModule', ['getUrlParameters']),
    checkingScreen() {
      this.mobileScreen = window.innerWidth < 850;
    },
  }
}
</script>

<style scoped>

.main {
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.main_item {
  margin: 15% 0 0;
  /*padding: 0 8%;*/
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1280px;
}
.main_item:first-child {
  margin-top: 12vh;
  padding: 0 8% 0 0;
}

.main_item:last-child {
  margin: 15% 0 10%;
  padding: 0;
}
.main_item:nth-child(2){
  width: 1298px;
}
.success_section_main {
  /*padding: 0 0 9%;*/
  padding: 0;
  width: 99vw;
  max-width: none;
  background: #0D121A no-repeat;
}

.tools_section {
  padding: 0;
}

.arrow_element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12vh;
}

.arrow {
  animation: arrowDown 2s infinite;
}

@keyframes arrowDown {
  0% {
    bottom: 30px;
    opacity: 1;
  }
  100% {
    bottom: 0;
    opacity: 0;
  }
}
@media screen and (max-width: 850px) {

  .main_item:first-child {
    margin: 50px 0 0;
    padding: 0;
  }
  .main_item:nth-child(2){
    width: auto;
  }
  .main_item {
    margin: 150px 0 0;
  }
  .success_section_main {
    margin: 250px 0 50px;
  }
  .main_item_mobile{
    width: 90vw;
  }
  .main_item_mobile:nth-child(4){
    margin: 450px 0 70px;
  }
  .tools_section{
    margin-top: 150px;
  }
}
</style>
