import Vue from "vue";
import axios from "axios";

export const state = () => ({
  checkout: {
    plan_id: null,
    email: null,
    referral_code: null,
    // checkout_details: {}
  }

})
export const mutations = {
  setPlanId(state, id) {
    state.checkout.plan_id = id
  },
  setEmail(state, email) {
    state.checkout.email = email
  },
  setReferralCode(state, referral_code) {
    state.checkout.referral_code = referral_code
  },
  setCheckoutDetails(state, obj) {
    state.checkout_details = obj
    localStorage.setItem('checkout_details', JSON.stringify(obj));
  }
}

export const actions = {
  async proceedPayment(ctx, checkoutObj) {
    if (checkoutObj.plan_id !== null && checkoutObj.email !== null) {
      await axios
        .post(`${process.env.CHECKOUT_URL}/api/checkout/generate`, checkoutObj, {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            ctx.dispatch('getCheckoutDetails')
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  async getCheckoutDetails(ctx) {
    await axios
      .get(`${process.env.CHECKOUT_URL}/api/checkout/details`, {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          ctx.commit('setCheckoutDetails', res.data)
          let CurrentTime = new Date()
          CurrentTime.setMinutes(CurrentTime.getMinutes() + 15);
          window.localStorage.setItem('timestamp', CurrentTime)
          this.$router.push('/payment')
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const getters = {
  checkout: state => state.checkout,
  checkout_details: state => state.checkout_details
}
