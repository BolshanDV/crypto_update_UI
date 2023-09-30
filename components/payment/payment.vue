<template>
  <div class="main_section">
    <div class="main_section-title">
      <span>ОФОРМЛЕНИЕ</span>
      <span
        v-if="time.minute"
        :class="{ selected : time.minute <= 3} "
      >
        {{ time.minute }}:{{ time.second }}
      </span>
    </div>
    <div class="payment_section">
      <div class="payment_section-item">
        <div class="payment_description">
          Перед оплатой внимательно ознакомьтесь с нашими
          <nuxt-link to="/terms" class="selected">Условиями</nuxt-link> и
          <nuxt-link to="/payment_instruction" class="selected">Инструкции по оплате</nuxt-link>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Выберите сеть в которой вы хотели бы оплатить
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
          <span class="selected">{{ checkout_details.initial_price }} USDT$</span>
          или
          <span class="selected">
            USDC$
          </span>
          на этот адрес:
        </div>
        <div
          class="input_element-btn">
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
            <svg :class="{active: copyFlag === 'payment'}"
                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{active: copyFlag === 'payment'}"
                    d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'payment'}"
                    d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'payment'}" d="M7.23975 1H9.83975" stroke="white" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'payment'}" d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'payment'}"
                    d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'payment'}"
                    d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          ОТПРАВЛЯЙТЕ ТОЛЬКО USDT$ ИЛИ $USDC В ВЫБРАННОЙ СЕТИ. МЫ НЕ БУДЕМ НЕСТИ ОТВЕТСТВЕННОСТИ ЕСЛИ ВЫ ОТПРАВИТЕ
          СРЕДСТВА НЕ НА ТОТ АДРЕС ИЛИ НЕ В ТОЙ СЕТИ
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          Ссылка на транзакцию/хеш
        </div>
        <div class="payment_input">
          <input
            v-model="transactionHash"
            class="input"
            type="text"
            :class="{exception: transactionSate === 'error'}"
          >
        </div>
      </div>
      <div class="payment_section-item">
        <div class="button_section">
          <div
            v-if="!((transactionHash !== '') && (this.selectedChain.name !== ''))"
            class="button">
            Проверка транзакции
          </div>
          <div
            v-if="((transactionHash !== '') && (this.selectedChain.name !== ''))"
            class="button button_active"
            @click="checkTransaction"
          >
            <span v-if="transactionSate === 'default' || transactionSate === 'error'">Проверка транзакции</span>
            <span v-if="transactionSate === 'processing'" class="loader"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";
import error from "@/layouts/error.vue";

export default {
  name: "payment",
  props: ['success_result'],
  data() {
    return {
      address: '',
      transactionHash: '',
      chains_details: null,
      chains: [
        {
          icon: require('@/assets/images/payment/ETH.svg'),
          title: 'ETH'
        },
        {
          icon: require('@/assets/images/payment/BSC.svg'),
          title: 'BSC',
        },
        {
          icon: require('@/assets/images/payment/MATIC.svg'),
          title: 'MATIC'
        },
        {
          icon: require('@/assets/images/payment/SOL.svg'),
          title: 'SOL'
        }
      ],
      selectedChain: {
        name: '',
        payment_tokens: [],
        wallet: ''
      },
      counterFilling: 0,
      transactionSate: 'default',
      currentTime: null,
      timer_id: '',
      time: {
        minute: null,
        second: null
      },
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['copyFlag']),
    error() {
      return error
    },
    checkout_details() {
      if (localStorage.checkout_details) {
        return JSON.parse(localStorage.getItem('checkout_details'));
      } else {
        return this.$store.state.checkoutModule.checkout_details
      }
    }

  },
  mounted() {
    this.getPaymentTokens()
    this.startTimer()
  },
  watch: {
    currentTime() {
      if (this.currentTime <= 0) {
        this.stopTimer()
        this.$router.push('/')
      }
    }
  },
  methods: {
    ...mapActions('checkingScreen', ['changeCopyFlag']),
    startTimer() {
      this.currentTime = window.localStorage.getItem('timestamp')
      this.currentTime = new Date(this.currentTime).getTime() - new Date().getTime()
      this.timer_id = setInterval(() => {
        this.currentTime = this.currentTime - 1000
        this.time.minute = new Date(this.currentTime).getMinutes()
        this.time.second = new Date(this.currentTime).getSeconds()

        if (this.time.minute <= 9) {
          this.time.minute = '0' + this.time.minute
        }
        if (this.time.second <= 9) {
          this.time.second = '0' + this.time.second
        }
      }, 1000)
    },

    stopTimer() {
      clearTimeout(this.timer_id)
      window.localStorage.removeItem('checkout_details')
      window.localStorage.removeItem('timestamp')
    },

    chooseChain(type) {
      this.selectedChain.name = type
      this.selectedChain.payment_tokens = this.chains_details.find(chains_detail => chains_detail.chain_name === type).payment_tokens
      this.selectedChain.wallet = this.chains_details.find(chains_detail => chains_detail.chain_name === type).wallet
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

    async copy_address(address) {
      let text = address
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag('payment')
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
      this.transactionSate = 'default'
      this.transactionSate = 'processing'
      await axios
        .post(`${process.env.PAYMENT_URL}/api/billing/internal/crypto/transactions/i/validate`,
          {
            chain_name: this.selectedChain.name,
            hash: this.transactionHash
          },
          {
            withCredentials: true
          }
        )
        .then(resObj => {
          if (resObj.status === 200) {
            this.stopTimer()
            this.success_result(resObj.data.identifier)
            this.transactionSate = 'default'
          }
        })
        .catch(error => {
          console.log(error);
          this.transactionSate = 'error'
        });
    }


  }
}
</script>

<style scoped>
.main_section {
  background: radial-gradient(55.66% 55.33% at 64.55% 0%, rgba(170, 26, 23, 0.3) 0%, rgba(170, 26, 23, 0) 100%), #010A16;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 35px 36px 25px;
  width: 391px;
}

.main_section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 30px;
  font-family: Montserrat,serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
  letter-spacing: 0.24px;
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
  margin: 0 0 7px;
}

.chain_elements {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.chain_elements-item {
  margin-right: 10px;
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
  background: #0D121A;
  border-radius: 8px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 0 1px rgba(21, 28, 40, 1);
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
  margin-top: 10px;
  justify-content: flex-end;
}

.button {
  background: #151C28;
  border-radius: 8px;
  padding: 12px 29px;
  color: #727A84;
}

.input_btn {
  background: #0D121A;
}

.button_active {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #AA1A17;
  border-radius: 8px;
  color: #FFFFFF;
  width: 160px;
}
.exception{
  color: #AA1A17;
}
@media screen and (width < 850px) {
  .main_section {
    border: 1px solid rgba(114, 122, 132, 0.1);
    padding: 30px 15px 18px;
  }

}
</style>
