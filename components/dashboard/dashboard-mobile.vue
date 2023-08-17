<template>
  <div class="panels_section">
    <div
      class="panel_header"
      v-if="!renewSubscriptionFlag"
    >
      <HeaderPenal/>
    </div>
    <div class="penal_body">
      <div class="penal_body-item">
        <Subscription
          v-if="!renewSubscriptionFlag"
          :renewSubscription="renewSubscription"
        />
        <RenewSubscription
          v-else
          :renewSubscription="renewSubscription"
        />
      </div>
    </div>
  </div>
</template>

<script>

import HeaderPenal from "@/components/dashboard/panels/Header-penal.vue";
import Subscription from "@/components/dashboard/panels/Subscription.vue";
import RenewSubscription from "@/components/dashboard/panels/RenewSubscription.vue";

export default {
  name: "dashboard-mobile",
  components: {RenewSubscription, Subscription, HeaderPenal},
  data() {
    return {
      renewSubscriptionFlag: false
    }
  },
  methods: {
    renewSubscription(data) {
      console.log(data)
      this.renewSubscriptionFlag = data
    }
  }
}
</script>

<style scoped>
.panels_section {
  display: flex;
  flex-direction: column;
  /*height: 80vh;*/
}

.penal_body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.penal_body-item {
  background: #0D121A;
  border-radius: 9px;
  padding: 25px 20px 20px;
  /*width: 6%;*/
}

.panel_header {
  background: #0D121A;
  border-radius: 9px;
  padding: 20px 35px;
  margin-bottom: 20px;
}

@media screen and ( width < 850px) {
  .panel_header {
    padding: 20px 15px;
  }
}

</style>
