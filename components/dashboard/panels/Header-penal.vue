<template>
  <div class="header_penal">
    <div class="header_penal-item" v-if="user_details">
      <div class="user_section">
        <div>
          <img
            v-if="user_details.discord_avatar != null"
            :src="('https://cdn.discordapp.com/avatars/' + user_details.discord_id + '/' + user_details.discord_avatar)"
            class="user_img"
            alt=""
          >
        </div>
        <div class="user_name">
          <div class="username">
            {{ user_details.discord_username }}
          </div>
          <div class="users_email">
            {{ user_details.discord_email }}
          </div>
        </div>
      </div>
    </div>
    <div class="header_penal-item"
         v-if="!screenWidth"
    >
      <div class="button_section">
        <div
          class="button"
          @click="changeReferralFlag()"
        >
          <div v-if="referralFlag"
               class="text_menu"
          >
            Рефералы
          </div>
          <div v-else
               class="text_menu"
          >
            Dashboard
          </div>
        </div>
      </div>
      <div class="button_section">
        <div class="button">
          <a href="https://app.cmd-root.com/web-tools/" class="text_menu">Web tools</a>
        </div>
      </div>
    </div>
    <div class="mobile_dash_header"
         v-else
    >
      <div class="description price_element">
        {{ realPlan.price }}$/{{ realPlan.uiText }}
      </div>
      <div class="description">
        Текущий план
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "axios";

export default {
  name: "Header-penal",
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth']),
    ...mapGetters('authorizationHandler', ['user_details']),
      ...mapGetters('referralModule', ['referralFlag'])
  },
  data() {
    return {
      renewSubscriptionFlag: false,
      available_plans: [],
      realPlan: {}
    }
  },
  async mounted() {
    await this.GET_USER_DETAILS()
    await this.getPlans()
  },
  methods: {
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    ...mapActions('referralModule', ['changeReferralFlag']),
    sorterPlans(field) {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    },
    async getPlans() {
      const response = await axios
        .get(`${process.env.PLAN_DETAILS_URL}/api/plans/usd-crypto/renewal/available`)
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
          this.available_plans.push(plan)
          if (plan.id === this.user_details.licence.planId) {
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
            this.realPlan = plan
          }
        });
      }
    },
  },
}
</script>

<style scoped>
.header_penal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button {
  background: #AA1A17;
  border-radius: 10px;
  padding: 8px 25px 7px;
  color: #FFFFFF;
  text-align: center;
  width: 90px;
  cursor: pointer;
}

.button:hover {
  background: #d21f1d;
}
.button_section{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.button_section:first-child {
  margin-right: 15px;
}

.header_penal-item {
  display: flex;
  flex-direction: row;
}

.mobile_dash_header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.description {
  font-size: 14px;
  line-height: 16px;
  color: #727A84;
}

.price_element {
  color: #AA1A17;
  font-weight: 500;
}

.user_img {
  border: 2px solid #2BD6A2;
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.user_section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.user_name {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.username {
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
}

.users_email {
  font-size: 14px;
  line-height: 20px;
  color: #727A84;
}
.text_menu{
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-size: 15px;
  font-weight: 300;
}
</style>
