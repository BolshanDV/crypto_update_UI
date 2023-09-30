<template>
  <header class="header" id="top">
    <div class="container">
      <NuxtLink v-scroll-to="'#top'" to="/" class="logo">
        <Logo/>
      </NuxtLink>
      <div class="nav">
        <div
          v-if="screenWidth"
        >
          <sidebar/>
        </div>
        <nav
          v-else
          class="header__navigation"
        >
          <div class="header__navigation-links">
            <NuxtLink v-scroll-to="'#top'" to="/" class="navigation-link">
              <span>Домой</span>
            </NuxtLink>
            <NuxtLink v-scroll-to="'#features'" to="/" class="navigation-link">
              <p>Преимущества</p>
            </NuxtLink>
            <NuxtLink v-scroll-to="'#soft'" to="/" class="navigation-link">
              Софт
            </NuxtLink>
            <NuxtLink v-scroll-to="'#faq'" to="/" class="navigation-link">
              FAQ
            </NuxtLink>
          </div>
          <div class="header__button"
               @click="openDashboard"
          >
            Dashboard
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/UIComponents/Logo.vue";
import {mapGetters, mapActions} from "vuex";
import axios from "axios";
import Sidebar from "@/components/UIComponents/sidebar.vue";

export default {
  name: "Navbar",
  components: {Sidebar, Logo},
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth']),
    ...mapGetters('authorizationHandler', ['redirectFlag'])
  },
  methods: {
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    ...mapActions('referralModule', ['changeReferralFlag']),

    async openDashboard() {
      await this.GET_USER_DETAILS()
      if (this.redirectFlag) {
        await this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  /*height: 102px;*/
  z-index: 10;
  padding: 15px 45px;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.header__navigation {
  display: flex;
  align-items: center;
  margin-top: 12px;
  z-index: 100;
}

.header__navigation-links {
  display: flex;
  margin-right: 32px;
}

.navigation-link {
  cursor: pointer;
  color: #8B929B;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  transition: 0.3s all ease;
  outline: none;
  letter-spacing: 0.16px;
}

.navigation-link:first-child {
  color: #FFFFFF;
}

.navigation-link:hover {
  color: #FFFFFF;
}

.navigation-link:not(:last-child) {
  margin-right: 32px;
}

.header__button {
  background: #AA1A17;
  border-radius: 10px;
  padding: 15px 30px;
  cursor: pointer;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.16px;
}

.header__button:hover {
  background: #c4211d;
}

.burger-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #AA1A17;
  border-radius: 100%;
  cursor: pointer;

}

.logo {
  outline: none;
}

@media screen and (width < 850px) {
  .header {
    padding: 25px 20px;
  }
}

</style>
