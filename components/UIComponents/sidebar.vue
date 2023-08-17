<template>
  <div>
    <transition name="slide-fade">
      <div
        class="sidebar sidebar_content"
        v-if="sidebarFlag"
      >
        <div class="sidebar_header">
          <div class="sidebar_header_item header_text">
            <p>©</p>
          </div>
          <div class="sidebar_header_item">
            <img src="../../assets/images/sidebar/sidebar_icon.svg" alt="">
          </div>
          <div class="sidebar_header_item header_text"
               @click="changeSidebarFlag"
          >
            <p>All rights reserved</p>
          </div>
        </div>
        <div class="sidebar_menu">
          <div class="header__navigation-links">
            <div
              @click="changeSidebarFlag"
              class="navigation-link"
            >
              <NuxtLink
                v-scroll-to="'#top-mobile'"
                to="/"
              >
                Домой
              </NuxtLink>
            </div>
            <div
              @click="changeSidebarFlag"
              class="navigation-link"
            >
              <NuxtLink
                v-scroll-to="'#soft-mobile'"
                to="/"
              >
                Софт
              </NuxtLink>
            </div>
            <div
              @click="changeSidebarFlag"
              class="navigation-link"
            >
              <NuxtLink
                v-scroll-to="'#features-mobile'"
                to="/"
              >
                Преимущества
              </NuxtLink>
            </div>
            <div
              @click="changeSidebarFlag"
              class="navigation-link"
            >
              <NuxtLink
                v-scroll-to="'#payment-mobile'"
                to="/"
              >
                Купить подписку
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="sidebar_button">
          <div
            class="dash_button"
            @click="openDashboard"
          >
            Dashboard
          </div>
        </div>
      </div>
      <div v-else
           @click="changeSidebarFlag"
           class="sidebar_icon"
      >
        <img src="../../assets/images/sidebar/menu.svg" alt="">
      </div>
    </transition>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "sidebar",
  computed: {
    ...mapGetters('sidebar', ['sidebarFlag']),
    ...mapGetters('authorizationHandler', ['redirectFlag'])
  },
  methods: {
    ...mapActions('sidebar', ['changeSidebarFlag']),
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    async openDashboard() {
      await this.changeSidebarFlag()
      await this.GET_USER_DETAILS()
      if (this.redirectFlag) {
        await this.$router.push('/dashboard')
      }
    }
  },
}
</script>

<style scoped>
.sidebar {
  height: 150vh;
  background: #151C28;
  width: 50%;
  position: fixed;
  left: 50%;
  z-index: 10000;
  top: 0;
  padding: 25px 20px;
}

.sidebar_icon {
  z-index: 10;
  top: 0;
  padding: 25px 0;
}

.sidebar_content {
  display: flex;
  flex-direction: column;
}

.header_text {
  color: #727A84;
  font-size: 10px;
  line-height: normal;
}

.sidebar_header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 60px;
}

.sidebar_header_item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar_header_item:nth-child(2) {
  margin: 0 5px;
}

.navigation-link {
  cursor: pointer;
  transition: 0.3s all ease;
}

.navigation-link:hover {
  color: #FFFFFF;
}

.navigation-link:not(:last-child) {
  margin-bottom: 25px;
}

.header__navigation-links {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 19px;
}

.sidebar_button {
  display: flex;
  margin-top: 150%;
}

.dash_button {
  background: #AA1A17;
  border-radius: 10px;
  padding: 10px 35px;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 18px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
