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
          <span class="selected">Условиями</span> и <span class="selected">Инструкцией по оплате</span>
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
          >
          <div
            v-if="selectedChain.wallet"
            @click="copy_address(selectedChain.wallet)"
            class="input_btn"
          >
            <img src="../../assets/images/payment/copy.svg" alt="">
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
          <input v-model="transactionHash" class="input" type="text">
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
            v-else
            class="button button_active"
            @click="checkTransaction"
          >
            Проверка транзакции
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";

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
      success_result_flag: false,
      currentTime: null,
      timer_id: '',
      time: {
        minute: null,
        second: null
      },
    }
  },
  computed: {
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
            console.log(resObj.data)
          }
        })
        .catch(error => {
          console.log(error);

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
  width: 24%;
  min-width: 320px;
  max-width: 400px;
}

.main_section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  line-height: 22px;
  color: #FFFFFF;
  margin-bottom: 30px;
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
  background: #AA1A17;
  border-radius: 8px;
  color: #FFFFFF;
}

@media screen and (width < 850px) {
  .main_section {
    border: 1px solid rgba(114, 122, 132, 0.1);
    width: 85%;
    padding: 30px 15px 18px;
  }

}
</style>
