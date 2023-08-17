<template>
  <div class="main_section">
    <div class="main_section-title">
      <span>Продлить</span>
      <div class="subscription_date">
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
        {{ user_details.licence.renewalDate | changeDateFormat }}
      </div>
    </div>
    <div class="payment_section">
      <div class="subscription_element">
        <div class="subscription_element-title">
          Выберите план подписки
        </div>
        <div class="selected_plan">
          <div
            v-for="available_plan in available_plans"
            :key="available_plan.id"
            @click="setPlanId(available_plan.id, available_plan.renewal_price)"
            :class="{button_active: (available_plan.id === paymentData.plan_id)}"
            class="selected_plan-item"
          >
            <div>
              <s
                class="struct_out"
                :class="{struct_out_active: (available_plan.id === paymentData.plan_id)}"
              >
                {{available_plan.price_without_sale}}$
              </s>
              <span>{{available_plan.price}}$</span>
            </div>
            <div>
              {{ available_plan.uiText }}
            </div>

          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Выберите сеть, в которой вы хотели бы оплатить
        </div>
        <div class="chain_elements">
          <div
            v-for="(chain, index) of chains"
            :key="index"
            class="chain_elements-item"
          >
            <div
              @click="chooseChain(chain.title)"
              class="chain_svg"
              :class="{ chain_svg_active: (chain.title === selectedChain.name)}"
            >
              <img :src="chain.icon"
                   class="icon_crypto"
                   :alt="chain.title"
              >
            </div>
            <div class="chain_elements-text">
              {{ chain.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Отправьте
          <span class="selected"> {{ checkedPlan }} USDT$</span>
          или
          <span class="selected">
            USDC$
          </span>
          на этот адрес:
        </div>
        <div
          class="input_element-btn"
        >
          <input
            class="input"
            type="text"
            v-model="selectedChain.wallet"
          >
          <div
            v-if="selectedChain.wallet"
            @click="copy_address(selectedChain.wallet)"
            class="input_btn"
          >
            <img src="../../../assets/images/payment/copy.svg" alt="">
          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Ссылка на транзакцию/хеш
        </div>
        <div class="payment_input">
          <input v-model="transactionHash" class="input" type="text">
        </div>
      </div>
      <div class="payment_section-item between_section">
        <div class="button_section">
          <div
            class="button"
            v-if="processingFlag === 'start'"
            :class="{ button_active: !((transactionHash === '') && (address === ''))}"
            @click="checkTransaction"
          >
            Проверить транзакцию
          </div>
          <div
            class="button button_active"
            v-if="processingFlag  === 'processing'"
          >
            <spinner/>
          </div>
        </div>
        <div v-if="!screenWidth" class="trans_desc">
          <div>
            ПЕРЕД ОПЛАТОЙ ОЗНАКОМЬТЕСЬ С
            <div class="selected">ИНСТРУКЦИЕЙ ПО ОПЛАТЕ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";
import Spinner from "@/components/UIComponents/Spinner.vue";

export default {
  name: "renewSubscription",
  components: {Spinner},
  props: ['success_result', 'renewSubscription'],
  data() {
    return {
      address: '',
      transactionHash: '',
      // renewSubscriptionFlag: false,
      chains: [
        {
          icon: require('../../../assets/images/payment/ETH.svg'),
          title: 'ETH'
        },
        {
          icon: require('../../../assets/images/payment/BSC.svg'),
          title: 'BSC',
        },
        {
          icon: require('../../../assets/images/payment/MATIC.svg'),
          title: 'MATIC'
        },
        {
          icon: require('../../../assets/images/payment/SOL.svg'),
          title: 'SOL'
        }
      ],
      selectedChain: {
        name: '',
        payment_tokens: [],
        wallet: ''
      },
      counterFilling: 0,
      processingFlag: 'start',
      available_plans: [],
      checkedPlan: null,
      paymentData: {
        plan_id: null,
        discord_id: null,
        hash: null,
        chain_name: null
      }
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth']),
    ...mapGetters('authorizationHandler', ['user_details']),
    ...mapGetters('checkoutModule', ['checkout'])
  },
  mounted() {
    this.getPlans()
    this.getPaymentTokens()
  },
  filters: {
    changeDateFormat: function (str) {
      let date = new Date(str)
      const shortDate = new Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(date).toString();
      return shortDate
    },
  },
  methods: {

    setPlanId(id, renewal_price) {
      this.paymentData.plan_id = id
      this.checkedPlan = renewal_price
    },
    chooseChain(type) {
      this.selectedChain.name = type
      this.selectedChain.payment_tokens = this.chains_details.find(chains_detail => chains_detail.chain_name === type).payment_tokens
      this.selectedChain.wallet = this.chains_details.find(chains_detail => chains_detail.chain_name === type).wallet
      this.paymentData.chain_name = type
    },

    async copy_address(address) {
      let text = address
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          console.log(`The text '${text}' is in the Clipboard Now!`);
        } else {
          console.log(`Clipboard API is Not Supported`);
        }
      } catch (err) {
        console.error(`Failed to copy: ${err}`);
      }
    },

    async checkTransaction() {
      this.processingFlag = 'processing'
      await axios
        .post(`${process.env.PAYMENT_URL}/api/billing/internal/crypto/transactions/r/validate`,
          {
            plan_id: this.paymentData.plan_id,
            discord_id: this.user_details.discord_id,
            hash: this.transactionHash,
            chain_name: this.paymentData.chain_name
          },
          {
            withCredentials: true
          }
        )
        .then(resObj => {
          if (resObj.status === 200) {
            this.renewSubscription(true)
            this.processingFlag = 'start'
          }
        })
        .catch(error => {
          this.$router.push('/dashboard')
          this.processingFlag = 'start'
          console.log('error')
        });
    },
    sorterPlans(field) {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    },

    async getPlans() {
      const response = await axios
        .get(`${process.env.PLAN_DETAILS_URL}/api/plans/usd-crypto/initial/available`)
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
              plan.uiText = "1 мес.";
              break;
            case 3:
              plan.uiText = "3 мес.";
              break;
            case 6:
              plan.uiText = "6 мес.";
              break;
            case 12:
              plan.uiText = "1 год";
              break;
          }
          this.available_plans.push(plan)
        });
      }
    },

    async getPaymentTokens() {
      const response = await axios
        .get(`${process.env.PAYMENT_URL}/api/billing/internal/crypto/payment-tokens`)
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
        this.chains_details = response.objects
      }
    },
  }
}
</script>

<style scoped>
.main_section {
  display: flex;
  flex-direction: column;
}

.main_section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  line-height: 22px;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.payment_section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.payment_section-item {
  margin-bottom: 15px;
}

.payment_description {
  color: #727A84;
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 10px;
}

.chain_elements {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.chain_elements-item {
  margin-right: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.chain_elements-item:last-child {
  margin: 0;
}

.chain_svg {
  background: rgba(21, 28, 40, 1);
  border-radius: 8px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 0 1px rgba(71, 77, 84, 1);
  margin-bottom: 10px;
}

.chain_svg_active {
  box-shadow: 4px 4px 0 1px rgba(170, 26, 23, 1);
}

.chain_elements-text {
  font-size: 14px;
  line-height: 20px;
  color: #727A84;
}

.button_section {
  display: flex;
  flex-direction: row;
}

.button {
  display: flex;
  width: 170px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #151C28;
  border-radius: 8px;
  padding: 10px 32px;
  color: #727A84;
}

.input_btn {
  background: #151C28;
}

.button_active {
  background: #AA1A17 !important;
  border-radius: 8px;
  color: #FFFFFF !important;;
}

.date_description {
  font-size: 13px;
  line-height: 30px;
  color: #727A84;
}

.subscription_element {
  margin-bottom: 18px;
  width: 100%;
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
}

.selected_plan-item {
  background: #151C28;
  border-radius: 10px;
  padding: 8px 5px 5px;
  color: #727A84;
  width: 100%;
  margin-right: 6px;
  text-align: center;
}

.selected_plan-item:last-child {
  margin-right: 0;
}

.input {
  background: #151C28;
}

.between_section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0 0;
}

.trans_desc {
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: #727A84;
}

.input_element-btn {
  background: #151C28;
}
.struct_out{
  color: #9e1613;
}
.struct_out_active{
  color: #FFFFFF;
}
@media screen and ( width < 850px) {
  .chain_svg {
    width: 60px;
    height: 60px;

  }

  .icon_crypto {
    width: 35px;
    height: 35px;
  }

  .chain_elements {
    justify-content: space-between;
  }

  .chain_elements-item {
    margin-right: 15px;
  }

  .between_section {
    justify-content: flex-end;
  }
}
</style>
