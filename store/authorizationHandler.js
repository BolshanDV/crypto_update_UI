import axios from "axios"

export default {
  state() {
    return {
      user_details: {
        "licence": {
          "identifier": "string",
          "creationDate": "",
          "renewalDate": "",
          "licenceType": {
            "name": "",
            "discordRoles": "",
            "majorRoleName": "",
            "majorRoleColor": "",
            "freeToRenew": "",
            "unbindable":""
          }
        },
      },
      unbindLicense: false,
      redirectFlag: false,
      available_plans: [],
      activeLicence: true
    }
  },
  actions: {
    GET_USER_DETAILS: async (ctx) => {
      await axios
        .get(`${process.env.USER_DETAILS_URL}/api/user/details/all`, {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            ctx.commit('UNBIND_LICENSE', false)
            ctx.commit('SET_USER_DETAILS', res.data)
            ctx.commit('REDIRECT_TO_DASH', true)
            if( new Date(res.data.licence.renewalDate) <= Date.now()) {
              ctx.commit('SET_ACTIVE_LICENCE')
            }
          }
        })
        .catch(error => {
          console.log(error)
          if (error.response.status === 401) {
            ctx.commit('UNBIND_LICENSE', false)
            document.location.href = process.env.USER_DETAILS_URL + '/api/user/oauth2/authorization/discord'
          } else if (error.response.status === 403) {
            ctx.commit('UNBIND_LICENSE', true)
            // this.$router.push('/dashboard')
          }
        });
    },
    sorterPlans(field) {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    },
    async getPlans() {
      const response = await axios
        .get(`${process.env.PLAN_DETAILS_URL}/api/plans/usd-crypto/available`)
        .then(resObj => {
          return {
            objects: resObj.data,
            status: resObj.status
          };
        })
        .catch(error => {
          console.log(error);
        });
      if (response.status === 200) {
        let plans = response.objects
        plans.sort(this.sorterPlans('period'));
        plans.forEach((plan) => {
          switch (plan.period) {
            case 1:
              plan.uiText = "месяц";
              break;
            case 3:
              plan.uiText = "3 месяца";
              break;
            case 6:
              plan.uiText = "6 месяцев";
              break;
            case 12:
              plan.uiText = "1 год";
              break;
          }
          this.available_plans.push(plan)
        });
      }
    },
  },
  mutations: {
    SET_USER_DETAILS: (state, data) => {
      state.user_details = data
    },
    UNBIND_LICENSE: (state, data) => {
      state.unbindLicense = data
    },
    REDIRECT_TO_DASH: (state, data) => {
      state.redirectFlag = data
    },
    SET_AVAILABLE_PLANS: (state, data) => {
      state.available_plans = data
    },
    SET_ACTIVE_LICENCE: (state) => {
      state.activeLicence = false
    }

  },
  getters: {
    user_details: (state) => {
      return state.user_details
    },
    unbindLicense: (state) => {
      return state.unbindLicense
    },
    redirectFlag: (state) => {
      return state.redirectFlag
    },
    available_plans: (state) => {
      return state.available_plans
    },
    activeLicence: (state) => {
      return state.activeLicence
    },
  }
}
