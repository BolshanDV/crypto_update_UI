<template>
  <div class="referral">
    <div class="referral_section">
      <ReferralInfo/>
    </div>
    <div class="referral_section">
      <ReferralStatistics/>
    </div>
  </div>
</template>

<script>
import ReferralInfo from "@/components/dashboard/referal/referralInfo.vue";
import ReferralStatistics from "@/components/dashboard/referal/referralStatistics.vue";

export default {
  name: "referral",
  components: {ReferralStatistics, ReferralInfo}
}
</script>

<style scoped>
.referral{
  width: 100%;
  grid-template-columns: repeat(2, 590px);
  grid-gap: 20px;
  display: grid;
  /*grid-auto-rows: 50vh 50vh;*/
}
.referral_section{
  border-radius: 9px;
  background: #0D121A;
  padding: 25px 25px;
}
</style>
