<template>
  <div>
    <div
      class="dash_section"
      v-if="!unbindLicense"
    >
      <Panels v-if="!screenWidth"/>
      <dashboard-mobile v-else/>
    </div>
    <Authorization v-if="unbindLicense"/>
  </div>
</template>

<script>
import Authorization from "@/components/dashboard/Authorization.vue";
import Panels from "@/components/dashboard/Panels.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "dashboard",
  layout: "dashboard",
  components: {Panels, Authorization},
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth']),
    ...mapGetters('authorizationHandler', ['unbindLicense', 'isUserAuthorized'])
  },
  methods:{
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    ...mapActions('checkingScreen', ['checkingScreen'])
  },
  beforeMount() {
    this.checkingScreen()
  },
  mounted() {
    this.GET_USER_DETAILS();
  }
}
</script>

<style scoped>
.dash_section{
  padding: 1vh 5%;
}
</style>
