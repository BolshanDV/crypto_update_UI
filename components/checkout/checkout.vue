<template>
  <div class="checkout_section">
    <div class="checkout_section-title">
      ОФОРМЛЕНИЕ
    </div>
    <div class="checkout_section_main">
      <div class="input_section">
        <div class="checkout_section_main-item">
          <div
            class="input_title"

          >
            Email <span class="red">*</span>
          </div>
          <div class="input_element">
            <input
              v-model="email"
              class="input"
              type="email"
              @blur="isEmailTouched = true"
              :class="{ error: isEmailError }"
              >
<!--            <div-->
<!--              v-if="isEmailError"-->
<!--              class="input_title"-->
<!--            >-->
<!--              Поле заполено неверно-->
<!--            </div>-->
          </div>
        </div>
        <div class="checkout_section_main-item">
          <div class="input_title">
            Реферальный код
          </div>
          <div
            class="input_element-btn"
            v-if="userReferralCodeState === 'codeVerified'"
          >
            <input
              v-model="referral_code"
              class="input default-text"
              type="text"
              readonly
            >
            <div class="input_button">
              <img src="../../assets/images/checkout/success_verify.svg" alt="">
            </div>
          </div>
          <div
            v-else
            class="input_element-btn"
          >
            <input
              v-model="referral_code"
              class="input"
              type="text"
              :class="{error: isReferralError}"
            >
            <div
              :class="{button_active: referral_code !== null}"
              class="input_button"
              @click="VERIFY_REFERRAL_CODE(referral_code)"
            >
              <span v-if="userReferralCodeState === 'processing'" class="loader"></span>
              <span v-if="userReferralCodeState === 'default'">Проверить</span>
            </div>
          </div>
        </div>
      </div>
      <div class="button_section">
        <div
          v-if="!isEmailValid"
          class="button"
        >
          Перейти к оплате
        </div>
        <div
          v-else
          @click="setDataForGenerate()"
          class="button button_active"
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
import error from "@/layouts/error.vue";
const emailCheckRegex = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/;
export default {
  name: "checkout",
  data() {
    return {
      verifyProcessing: false,
      referral_code: null,
      email: null,
      isEmailTouched: false,
    }
  },
  computed: {
    error() {
      return error
    },
    ...mapGetters('checkoutModule', ['checkout']),
    ...mapGetters('referralModule', ["userReferralCodeState", 'isReferralError']),
    isEmailValid() {
      return emailCheckRegex.test(this.email);
    },
    isEmailError() {
      return !this.isEmailValid && this.isEmailTouched;
    },
  },
  mounted() {
    this.checkData();
    if (localStorage.referralCode) {
      this.referral_code = localStorage.referralCode
    }
  },
  methods: {
    ...mapMutations('checkoutModule', ['setReferralCode', 'setEmail']),
    ...mapActions('checkoutModule', ['proceedPayment']),
    ...mapActions('referralModule', ['VERIFY_REFERRAL_CODE']),
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
      if (this.checkout.plan_id == null) {
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
  width: 391px;
  height: 628px;
  display: flex;
  flex-direction: column;
  padding: 35px 36px 25px;
}

.checkout_section-title {
  color: #FFFFFF;
  margin-bottom: 40px;
  font-family: Montserrat,serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
  letter-spacing: 0.24px;

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

.input_button {
  border-radius: 8px;
  background: #151C28;
  padding: 8px 17px;
  margin: 4px;
  color: #727A84;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  width: 110px;
}

.default-text {
  color: #727A84;
}
.error{
  color: #AA1A17;
}
.button_active {
  background: #AA1A17;
  border-radius: 8px;
  color: #FFFFFF;
  transition: all 1s ease;
}
.loader {
  width: 20px;
  height: 20px;
  border: 1px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (width < 850px) {
  .checkout_section {
    border: 1px solid rgba(114, 122, 132, 0.1);
    height: 473px;
    padding: 36px 15px 20px;
  }

}
</style>
