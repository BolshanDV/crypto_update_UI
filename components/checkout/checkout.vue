<template>
  <div class="checkout_section">
    <div class="checkout_section-title">
      ОФОРМЛЕНИЕ
    </div>
    <div class="checkout_section_main">
      <div class="input_section">
        <div class="checkout_section_main-item">
          <div class="input_title">
            Email <span class="red">*</span>
          </div>
          <div class="input_element">
            <input v-model="email" class="input" type="text">
          </div>
        </div>
        <div class="checkout_section_main-item">
          <div class="input_title">
            Реферальный код
          </div>
          <div class="input_element-btn">
            <input v-model="referral_code" class="input" type="text">
          </div>
        </div>
      </div>
      <div class="button_section">
        <div
          v-if="email === null"
          class="button"
        >
          Перейти к оплате
        </div>
        <div
          v-else
          @click="setDataForGenerate()"
          class="button button-active"
        >
          Перейти к оплате
          <!--          <NuxtLink to="/payment"> Перейти к оплате</NuxtLink>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from "vuex";
import checkout from "@/pages/checkout.vue";

export default {
  name: "checkout",
  data() {
    return {
      verifyProcessing: false,
      referral_code: null,
      email: null
    }
  },
  computed: {
    ...mapGetters('checkoutModule', ['checkout'])
  },
  mounted() {
    this.checkData()
  },
  methods: {
    ...mapMutations('checkoutModule', ['setReferralCode', 'setEmail']),
    ...mapActions('checkoutModule', ['proceedPayment']),
    setDataForGenerate() {
      if (localStorage.getItem('checkout_details') !== null) {
        this.$router.push('/payment')
      } else {
        this.setReferralCode(this.referral_code);
        this.setEmail(this.email)
        this.proceedPayment(this.checkout)
      }

    },
    checkData() {
      if ( this.checkout.plan_id == null){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.checkout_section {
  background: radial-gradient(55.66% 55.33% at 64.55% 0%, rgba(170, 26, 23, 0.3) 0%, rgba(170, 26, 23, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #010A16;
  border-radius: 20px;
  min-height: 500px;
  max-height: 600px;
  height: 53vh;
  display: flex;
  flex-direction: column;
  padding: 35px 36px 25px;
  width: 24%;
  min-width: 320px;
  max-width: 400px;
}

.checkout_section-title {
  font-size: 22px;
  line-height: 22px;
  color: #FFFFFF;
  margin-bottom: 40px;
}

.checkout_section_main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.checkout_section_main-item {
  margin-bottom: 20px;
}

.input_title {
  font-size: 14px;
  line-height: 20px;
  color: #727A84;
  margin-bottom: 8px;
}

.button_section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button {
  background: #151C28;
  border-radius: 8px;
  padding: 10px 29px;
  color: #727A84;
}

.red {
  color: #AA1A17;
}

.input_btn-processing {
  background: #AA1A17;
}

.input_btn-active {
  background: #AA1A17;
  color: #FFFFFF;
}

.button-active {
  background: #AA1A17;
  border-radius: 8px;
  color: #FFFFFF;
}

@media screen and (width < 850px) {
  .checkout_section {
    border: 1px solid rgba(114, 122, 132, 0.1);
    width: 85%;
    padding: 36px 15px 20px;
  }

}
</style>
