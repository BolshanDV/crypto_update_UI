import axios from "axios";

export const state = () => ({
  referralFlag: true,
  referralDetails: null,
  walletChangerFlag: 'default',
  userReferralCodeState: 'default',
  isReferralError: false
})
export const mutations = {
  changeReferralFlag(state) {
    state.referralFlag = !state.referralFlag
  },
  setReferralCode(state, data) {
    state.referralDetails = data
  },
  setWalletChangerFlag(state, data) {
    state.walletChangerFlag = data
  },
  setUserReferralCodeState(state, flag) {
    state.userReferralCodeState = flag
  },
  setIsReferralError(state, stateFlag) {
    state.isReferralError = stateFlag
  },
}

export const actions = {
  GET_REFERRAL_DETAILS: async (ctx) => {
    await axios
      .get(`${process.env.USER_DETAILS_URL}/api/user/referral/me`, {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          ctx.commit('setReferralCode', res.data)
        }
      })
      .catch(error => {
        console.log(error)
      });
  },
  async changeReferralFlag(ctx) {
    // await ctx.dispatch('GET_REFERRAL_DETAILS')
    ctx.commit('changeReferralFlag')
  },
  changeWalletFlag(ctx, stateInfo) {
    ctx.commit('setWalletChangerFlag', stateInfo)
  },
  UPDATE_WALLET: async (ctx, walletCode) => {
    ctx.commit('setWalletChangerFlag', 'processing')
    await axios
      .post(`${process.env.USER_DETAILS_URL}/api/user/referral/link-wallet`, {wallet: walletCode}, {
        withCredentials: true
      })
      .then(async res => {
        if (res.status === 200) {
          ctx.commit('setWalletChangerFlag', 'default')
          await ctx.dispatch('GET_REFERRAL_DETAILS')
        }
      })
      .catch(error => {
        console.log(error);
        ctx.commit('setWalletChangerFlag', 'default')
      });
  },
  getUrlParameters(ctx) {
    localStorage.removeItem("referralCode")
    let referralCode = new URLSearchParams(window.location.search).get("referralCode");
    if (referralCode !== null) {
      localStorage.setItem('referralCode', referralCode)
      ctx.commit('setUserReferralCodeState', 'codeVerified')
    }
  },
  VERIFY_REFERRAL_CODE: async (ctx, refCode) => {
    if (refCode !== null) {
      ctx.commit('setUserReferralCodeState', 'processing')
      await axios
        .get(`${process.env.USER_DETAILS_URL}/api/user/referral?referralCode=${refCode}`, {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            ctx.commit('setIsReferralError', false)
            ctx.commit('setUserReferralCodeState', 'codeVerified')
          }
        })
        .catch(error => {
          ctx.commit('setUserReferralCodeState', 'default')
          ctx.commit('setIsReferralError', true)
          console.log(error);
        });

    }
  }
}

export const getters = {
  referralFlag: state => state.referralFlag,
  referralDetails: state => state.referralDetails,
  walletChangerFlag: state => state.walletChangerFlag,
  userReferralCodeState: state => state.userReferralCodeState,
  isReferralError: state => state.isReferralError,
}
