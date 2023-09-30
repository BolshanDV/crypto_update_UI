<template>
  <div class="subscription">
    <div class="subscription_element">
      <div class="subscription_header">
        <div class="subscription_title">
          Подписка
        </div>
        <div
          v-if="user_details"
          class="subscription_date">
          <span
            class="date_description"
            v-if="!screenWidth"
          >
            заканчивается
          </span>
          <span
            v-else
            class="date_description"
          >
            до
          </span>
          <span
            :class="{selected: !activeLicence}"
          >
            {{ finaleDate }}
          </span>
        </div>
      </div>
    </div>
    <div class="subscription_element">
      <div class="double_section">
        <div class="double_section_item">
          <div class="subscription_element-title">
            Лицензионный ключ
          </div>
          <div
            v-if="user_details"
            class="double_section_body copy_section">
            {{ user_details.licence.identifier }}
          </div>
        </div>
        <div
          v-if="!screenWidth"
          class="double_section_item"
        >
          <div class="subscription_element-title">
            Роль
          </div>
          <div class="double_section_body double_section">
            <div v-if="user_details">
              {{ user_details.licence.licenceType.majorRoleName }}
            </div>
            <div
              class="role_circle"
              :style="{ background: roleColor}"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!screenWidth" class="subscription_element">
      <div class="subscription_element-title">
        Текущий план
      </div>
      <div
        class="double_section_body copy_section payment_el"
      >
        {{ planInfo }}
      </div>
    </div>
    <div class="subscription_element">
      <div class="subscription_element-title">
        Последние транзакции
      </div>
      <div class="transactions">
        <div
          v-for="(payment, index) in user_details.payments"
          :key="index"
          class="transactions_element">
          <div
            class="transaction_item transaction_item_payment"
            :class="{success: payment.paymentState === 'succeeded', selected: payment.paymentState !== 'succeeded'}"


          >
            <span>{{ payment.amount }} {{ payment.currency }}<span v-if="payment.currency === 'RUB'">&#8381</span><span
              v-else>$</span> - {{ payment.chainName }}
            </span>
          </div>
          <div class="transaction_item transaction_item_data">
            {{ payment.paymentDate | changeDateFormat }}
          </div>
          <div
            v-if="!screenWidth"
            class="transaction_item">
            {{ payment.transactionId }}
          </div>
          <div class="transactions_element">
            <div class="transaction_item"
                 @click=moveUrlTransaction(payment.transactionId)
            >
              <img src="../../../assets/images/dashboard/search.svg" alt="" class="button_section">
            </div>
            <div v-if="!screenWidth" class="transaction_item"
                 @click="copy(payment.transactionId)"
            >
              <svg :class="{active: copyFlag === payment.transactionId}"
                   width="15" height="15" viewBox="0 0 15 15" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path :class="{active: copyFlag === payment.transactionId}"
                      d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
                      stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path :class="{active: copyFlag === payment.transactionId}"
                      d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
                      stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path :class="{active: copyFlag === payment.transactionId}" d="M7.23975 1H9.83975" stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path :class="{active: copyFlag === payment.transactionId}"
                      d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <path :class="{active: copyFlag === payment.transactionId}"
                      d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
                      stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <path :class="{active: copyFlag === payment.transactionId}"
                      d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
                      stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="subscription_element">
      <div class="subscription_header subscription_btn">
        <div class="btn_canteen"
             @click="renew_sub"
        >
          Продлить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "Subscription",
  props: ['renewSubscription'],
  data() {
    return {
      renewSubscriptionFlag: false,
      available_plans: [],
      planInfo: ''
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth', 'copyFlag']),
    ...mapGetters('authorizationHandler', ['user_details', 'activeLicence']),

    roleColor() {
      return `#${this.user_details.licence.licenceType.majorRoleColor.toString(16)}`
    },

    finaleDate() {
      if (this.user_details.licence.renewalDate) {
        let date = new Date(this.user_details.licence.renewalDate)
        const shortDate = new Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(date);
        return shortDate;
      }
    },
  },
  filters: {
    changeDateFormat: function (str) {
      let date = new Date(str)
      const shortDate = new Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(date).toString();
      const shortTime = new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(date).toString();
      return shortDate + ' ' + shortTime
    },
  },
  async mounted() {
    await this.GET_USER_DETAILS()
    await this.getPlans()
  },
  methods: {
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    ...mapActions('checkingScreen', ['changeCopyFlag']),

    renew_sub() {
      this.renewSubscription(true)
    },
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
        plans.forEach((available_plan) => {
          if (available_plan.id === this.user_details.licence.planId) {
            switch (available_plan.period) {
              case 1:
                available_plan.uiText = "месяц";
                break;
              case 3:
                available_plan.uiText = "3 месяца";
                break;
              case 6:
                available_plan.uiText = "6 месяцев";
                break;
              case 12:
                available_plan.uiText = "1 год";
                break;
            }
            this.planInfo = available_plan.price + '$' + ' - ' + available_plan.uiText
          }
        })
      }
    },
    async copy(transactionId) {
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag(transactionId)
          await navigator.clipboard.writeText(transactionId);
          setTimeout(() => {
            this.changeCopyFlag(false)
          }, 150);
        }
      } catch (err) {
        console.error(`Failed to copy: ${err}`);
      }
    },
    moveUrlTransaction(transaction) {
      document.location.href = 'https://goerli.explorer.zksync.io/address/' + transaction
    }
  }
}
</script>

<style scoped>
.subscription {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
}

.subscription_title {
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Montserrat', serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 160% */
}

.subscription_element {
  margin-bottom: 18px;
  width: 100%;
}

.subscription_element:last-child {
  margin: 21px 0 0;
}

.subscription_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
}

.date_description {
  font-size: 13px;
  line-height: 30px;
  color: #727A84;
}

.date_description:first-child {
  margin-right: 10px;
}

.subscription_element-title {
  color: #727A84;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
}

.selected_plan {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.selected_plan-item {
  background: #151C28;
  border-radius: 10px;
  padding: 9px 15px;
  color: #727A84;
  width: 100%;
  margin-right: 10px;
  text-align: center;
}

.selected_plan-item:last-child {
  margin-right: 0;
}

.double_section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.double_section_body {
  background: #151C28;
  border-radius: 10px;
  color: #FFFFFF;
  padding: 9px 15px;
}

.double_section_item {
  width: 100%;
  margin-right: 10px;
}

.double_section_item:last-child {
  margin: 0;
}

.role_circle {
  border-radius: 50%;
  width: 15px;
  height: 15px;
}

.transactions {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  background: #151C28;
  border-radius: 10px;
  max-height: 200px;
  height: 200px;
  overflow-y: scroll;
}

.transactions::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.transaction_item {
  color: #727A84;
  margin-right: 10px;
  /*height: 25px;*/
  white-space: nowrap;
}

.transaction_item:last-child {
  margin-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.transaction_item:nth-child(3) {
  overflow-x: scroll;
  width: 100px;
}

.transaction_item::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.transaction_item_payment {
  width: 130px;
  overflow-x: scroll;

}

.transaction_item_data {
  width: 120px;
  overflow-x: scroll;
}

.transactions_element {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
}

.selected_item {
  background-color: #AA1A17;
  color: #FFFFFF;
}

.transactions_element:last-child {
  margin-bottom: 0;
}

.btn_canteen {
  background: #AA1A17;
  border-radius: 10px;
  color: #FFFFFF;
  padding: 10px 30px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 300;
}

.success {
  color: #00FFA3;
}

.selected {
  color: #AA1A17;
}

.payment_el {
  height: 22px;
  width: 205px;
}

@media screen and ( width < 850px) {
  .subscription_btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

}
</style>
