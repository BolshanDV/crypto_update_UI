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
    <div v-if="!screenWidth" class="subscription_element">
      <div class="subscription_element-title">
        Текущий план
      </div>
      <div class="selected_plan">
        <div class="selected_plan-item"
             v-for="available_plan in available_plans"
             :key="available_plan.id"
             :class="{ selected_item: available_plan.id === user_details.licence.planId}"
        >
          <div>
            {{ available_plan.price }}$
          </div>
          <div>
            {{ available_plan.uiText }}
          </div>
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
            class="double_section_body">
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
            <div class="role_circle">

            </div>
          </div>
        </div>
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
          <div class="transaction_item success">
            {{ payment.amount }} USDT$ - {{ payment.chainName }}
          </div>
          <div class="transaction_item">
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
              <img src="../../../assets/images/dashboard/search.svg" alt="">
            </div>
            <div v-if="!screenWidth" class="transaction_item"
                 @click="copy(payment.transactionId)"
            >
              <img src="../../../assets/images/dashboard/copy.svg" alt="">
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
        <!--        <div class="subscription_date">-->
        <!--          <span class="date_description">Отключить авто-продление</span>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "Subscription",
  props: ['renewSubscription'],
  data() {
    return {
      renewSubscriptionFlag: false,
      available_plans: []
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth']),
    ...mapGetters('authorizationHandler', ['user_details', 'activeLicence']),

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
  mounted() {
    this.getPlans()
  },
  methods: {
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
    async copy(transactionId) {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(transactionId);
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
}

.subscription_element {
  margin-bottom: 18px;
  width: 100%;
}

.subscription_element:last-child {
  margin: 15px 0 0;
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
.date_description:first-child{
  margin-right: 5px;
}
.subscription_element-title {
  color: #727A84;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
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
  background: #A50A7F;
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
}

.transaction_item:last-child {
  margin-right: 0;
}

.transaction_item:nth-child(3) {
  overflow-x: scroll;
  width: 90px;
}

.transaction_item::-webkit-scrollbar {
  width: 0;
  height: 0;
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
}

.success {
  color: #00FFA3;
}

@media screen and ( width < 850px) {
  .subscription_btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

}
</style>
