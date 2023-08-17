<template>
  <div class="panels_section">
    <div class="panel_header">
      <HeaderPenal/>
    </div>
    <div class="penal_body">
      <div class="penal_body-item">
        <Subscription
          v-if="!renewSubscriptionFlag"
          :renewSubscription="renewSubscription"
        />
        <RenewSubscription v-else :renewSubscription="renewSubscription"/>
      </div>
      <div class="penal_body-item">
        <Tools/>
      </div>
    </div>
  </div>
</template>

<script>

import HeaderPenal from "@/components/dashboard/panels/Header-penal.vue";
import Subscription from "@/components/dashboard/panels/Subscription.vue";
import Tools from "@/components/dashboard/panels/Tools.vue";
import RenewSubscription from "@/components/dashboard/panels/RenewSubscription.vue";

export default {
  name: "Panels",
  components: {RenewSubscription, Tools, Subscription, HeaderPenal},
  data() {
    return {
      renewSubscriptionFlag: false
    }
  },
  methods: {
    renewSubscription(data) {
      this.renewSubscriptionFlag = data
    }
  }
}
</script>

<style scoped>
.panels_section {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.penal_body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 1100px;
}

.penal_body-item {
  background: #0D121A;
  border-radius: 9px;
  padding: 25px 20px 15px;
  width: 67%;
}

.panel_header {
  background: #0D121A;
  border-radius: 9px;
  padding: 20px 35px;
  margin-bottom: 20px;
}

.penal_body-item:first-child {
  margin-right: 20px;
  width: 40%;
  min-width: 450px;
}
</style>
