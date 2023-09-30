<template>
  <div class="main_section">
    <div class="main_section-title">
      <span class="title_renew">Продлить</span>
      <div class="subscription_date">
        <!--          <span-->
        <!--            class="date_description data_margin"-->
        <!--            v-if="!screenWidth"-->
        <!--          >-->
        <!--            заканчивается-->
        <!--          </span>-->
        <!--        <span-->
        <!--          v-else-->
        <!--          class="date_description data_margin"-->
        <!--        >-->
        <!--          до-->
        <!--        </span>-->
        <!--        {{ user_details.licence.renewalDate | changeDateFormat }}-->
        <img
          src="../../../assets/images/dashboard/arrow.svg"
          @click="renewSubscription(false)"
          alt="">
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
                v-if="available_plan.sale_percent < 0"
                class="struct_out"
                :class="{struct_out_active: (available_plan.id === paymentData.plan_id)}"
              >
                {{ available_plan.price_without_sale }}$
              </s>
              <span>{{ available_plan.price }}$</span>
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
            readonly
          >
          <div
            v-if="selectedChain.wallet"
            @click="copy_address(selectedChain.wallet)"
            class="input_btn"
          >
            <svg :class="{active: copyFlag === 'renewal'}"
                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{active: copyFlag === 'renewal'}"
                    d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'renewal'}"
                    d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'renewal'}" d="M7.23975 1H9.83975" stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'renewal'}" d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903"
                    stroke="white"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'renewal'}"
                    d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'renewal'}"
                    d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Ссылка на транзакцию/хеш
        </div>
        <div
          class="payment_input"
        >
          <input v-model="transactionHash" class="input" type="text">
        </div>
      </div>
      <div class="payment_section-item between_section">
        <div class="button_section">
          <!--          <div-->
          <!--            class="button"-->
          <!--            v-if="processingFlag === 'start'"-->
          <!--            :class="{ button_active: mainFlag}"-->
          <!--          >-->
          <!--            Проверить транзакцию-->
          <!--          </div>-->
          <div
            class="button"
            v-if="!mainFlag"
          >
            Проверить транзакцию
          </div>
          <div v-else>
            <div
              class="button"
              v-if="processingFlag === 'start'"
              :class="{ button_active: mainFlag}"
              @click="checkTransaction"
            >
              Проверить транзакцию
            </div>
          </div>
          <div
            class="button button_active"
            v-if="processingFlag  === 'processing'"
          >
            <spinner/>
          </div>
        </div>
        <div v-if="!screenWidth" class="trans_desc">
          <div class="description">
            ПЕРЕД ОПЛАТОЙ ОЗНАКОМЬТЕСЬ С
            <nuxt-link to="/payment_instruction" class="selected">ИНСТРУКЦИЕЙ ПО ОПЛАТЕ</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
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
      },
      mainFlag: false
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth', 'copyFlag']),
    ...mapGetters('authorizationHandler', ['user_details']),
    ...mapGetters('checkoutModule', ['checkout']),
  },
  mounted() {
    this.getPlans()
    this.getPaymentTokens()
  },
  watch: {
    transactionHash() {
      this.activeTransaction()
    }
  },
  filters: {
    changeDateFormat: function (str) {
      let date = new Date(str)
      const shortDate = new Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(date).toString();
      return shortDate
    },
  },
  methods: {
    ...mapActions('checkingScreen', ['changeCopyFlag']),

    activeTransaction() {
      let flag = ''
      if (this.paymentData.plan_id !== null) flag += "plan"
      if (this.selectedChain.name !== '') flag += "hash"
      if (this.transactionHash !== '') flag += "Thash"
      if (flag.length === 13) {
        this.mainFlag = true
      }
    },

    setPlanId(id, renewal_price) {
      this.paymentData.plan_id = id
      this.checkedPlan = renewal_price
      this.activeTransaction()
    },
    chooseChain(type) {
      this.selectedChain.name = type
      this.selectedChain.payment_tokens = this.chains_details.find(chains_detail => chains_detail.chain_name === type).payment_tokens
      this.selectedChain.wallet = this.chains_details.find(chains_detail => chains_detail.chain_name === type).wallet
      this.paymentData.chain_name = type
      this.activeTransaction()
    },

    async copy_address(address) {
      let text = address
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag('renewal')
          await navigator.clipboard.writeText(text);
          console.log(`The text '${text}' is in the Clipboard Now!`);
          setTimeout(() => {
            this.changeCopyFlag(false)
          }, 150);
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
            this.renewSubscription(false)
            this.processingFlag = 'start'
          }
        })
        .catch(error => {
          this.renewSubscription(false)
          this.processingFlag = 'start'
        });
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

.subscription_date {
  cursor: pointer;
}

.main_section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  line-height: 22px;
  color: #FFFFFF;
  margin-bottom: 15px;
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
  height: 100px;
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
  transition: all 1s ease;
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
  height: 59px;
}

.selected_plan-item {
  background: #151C28;
  border-radius: 10px;
  padding: 8px 1px 5px;
  color: #727A84;
  width: 100%;
  margin-right: 11px;
  text-align: center;
  cursor: pointer;
  transition: all 1s ease;
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

.struct_out {
  color: #9e1613;
}

.struct_out_active {
  color: #FFFFFF;
}

.data_margin {
  margin-right: 10px;
}

.description {
  color: #727A84;
  text-align: right;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.5px; /* 154.167% */
}

.title_renew {
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 160% */
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

  .selected_plan {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    height: auto;
  }

  .selected_plan-item {
    margin: 0;
    width: 93%;
  }

}
</style>
