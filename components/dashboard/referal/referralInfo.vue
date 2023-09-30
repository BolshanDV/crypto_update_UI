<template>
  <div class="referralInfo_section">
    <div class="referralInfo_section-title">
      Рефералы
    </div>
    <div class="referral_section">
      <div class="header_element">
        Ваш реферальный код/ссылка
      </div>
      <div class="referral_element">
        <div class="link">
          <div
            v-if="transformFlag === 'right'"
            class="cursor_text"
          >
            {{ referralDetails.code }}
          </div>
          <div
            v-if="transformFlag === 'left'"
            class="cursor_text"
          >
            crypto.cmd-root.com/ref={{ referralDetails.code }}
          </div>
          <div @click="copy" class="pointer">
            <svg :class="{active: copyFlag === 'referral'}"
                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{active: copyFlag === 'referral'}"
                    d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'referral'}"
                    d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'referral'}" d="M7.23975 1H9.83975" stroke="white" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'referral'}" d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'referral'}"
                    d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'referral'}"
                    d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="referral_button">
          <div
            class="referral_button_item pointer"
            @click="changFlag('left')"
          >
            Ссылка
          </div>
          <div
            class="referral_button_item pointer"
            @click="changFlag('right')"
          >
            Код
          </div>
          <div
            class="active_btn"
            :class="{active_btn_right: transformFlag === 'right', active_btn_left: transformFlag === 'left'}"
          >
          </div>
        </div>
      </div>
      <div class="header_element">
        Ваш кошелек для получения вознаграждений (BSC/ ETH/ POLYGON/ ARB/ AVAX)
      </div>
      <div
        class="wallet_section"
        v-if="walletChangerFlag === 'default'"
      >
        <div class="link cursor_text">
          {{ referralDetails.withdrawal_wallet }}
        </div>
        <div
          class="wallet_button"
          @click="changeWalletFlag('editing')"
        >
          <img src="../../../assets/images/dashboard/change_active.svg" alt="">
        </div>
      </div>
      <div
        v-if="walletChangerFlag === 'editing'"
        class="wallet_section"
      >
        <input v-model="wallet" class="input" type="text">
        <div
          v-if="wallet.length === 42"
          class="wallet_button unactive"
        >
          <img src="../../../assets/images/dashboard/change.svg" alt="">
        </div>
        <div
          v-else
          class="wallet_button"
          @click="UPDATE_WALLET(wallet)"
        >
          <img src="../../../assets/images/dashboard/change_active.svg" alt="">
        </div>
      </div>
      <div
        class="wallet_section"
        v-if="walletChangerFlag === 'processing'"
      >
        <div class="link cursor_text">
          {{ wallet }}
        </div>
        <div
          class="wallet_button"
        >
          <span class="loader"></span>
        </div>
      </div>
      <div class="header_element">
        Последние покупки по вашему реферальному коду
      </div>
      <div
        class="referralInfo_space"
      >
        <div class="referral_item"
             v-for="(referralData, index) in referralDetails.referral_history"
             :key="index"
        >
          <div class="referralInfo_space_item">
            {{ referralData.order_price }}$ - {{ referralData.period }} мес. план
          </div>
          <div class="referralInfo_space_item">
            {{ referralData.date | changeDateFormat }}
          </div>
          <div
            v-if="referralData.discord_username === ''"
            class="referralInfo_space_item"
          >
            ...
          </div>
          <div
            v-else
            class="referralInfo_space_item"
          >
            {{ referralData.discord_username }}
          </div>
          <div class="referralInfo_space_item success">
            +{{ referralData.earned_amount }}$
          </div>
          <div
            class="referralInfo_space_item"
            :class="{success: referralData.payout_state !== 'WAITING_PAYOUT'}"
          >
            <span v-if="referralData.payout_state === 'WAITING_PAYOUT'">В процессе</span>
            <span v-else class="success">Выплачено</span>
          </div>
          <div class="referralInfo_space_item pointer">
            <a :href="referralData.payout_confirmation">
              <img src="../../../assets/images/dashboard/search.svg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "referralInfo",
  data() {
    return {
      transformFlag: 'left',
      wallet: '0x'
    }
  },
  computed: {
    ...mapGetters('referralModule', ['referralDetails', 'walletChangerFlag']),
    ...mapGetters('checkingScreen', ['copyFlag'])
  },
  methods: {
    ...mapActions('referralModule', ['changeWalletFlag', 'UPDATE_WALLET']),
    ...mapActions('checkingScreen', ['changeCopyFlag']),

    changFlag(position) {
      this.transformFlag = position
    },
    async copy() {
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag('referral')
          if (this.transformFlag === 'left') {
            let link = 'crypto.cmd-root.com/ref=' + this.referralDetails.code
            await navigator.clipboard.writeText(link);
            setTimeout(() => {
              this.changeCopyFlag(false)
            }, 150);
          } else {
            await navigator.clipboard.writeText(this.referralDetails.code);
            setTimeout(() => {
              this.changeCopyFlag(false)
            }, 150);
          }
        }
      } catch (err) {
        console.error(`Failed to copy: ${err}`);
      }
    },
  },
  filters: {
    changeDateFormat: function (str) {
      let date = new Date(str)
      const shortDate = new Intl.DateTimeFormat("ru", {dateStyle: "short"}).format(date).toString();
      // const shortTime = new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(date).toString();
      return shortDate
    },
  },
}
</script>

<style scoped>
.referralInfo_section-title {
  color: #FFFFFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Montserrat, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  padding-bottom: 15px;
}

.header_element {
  color: #727A84;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  margin-bottom: 10px;
}

.referral_element {
  display: grid;
  grid-template-columns: 2.3fr 1fr;
  gap: 25px;
  margin-bottom: 20px;
}

.link {
  border-radius: 10px;
  background: #151C28;
  padding: 14px 15px;
  color: #8B929B;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.referral_button {
  border-radius: 8px;
  border: 1px solid #AA1A17;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.16px;
  position: relative;
  z-index: 2;
}

.active_btn {
  z-index: -1;
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: #9e1613;
  border-radius: 7px;
  left: 0;
  transform: translateX(0%);
  transition-duration: 500ms;
}

.active_btn_right {
  transform: translateX(100%);
  transition-duration: 500ms;
}

.active_btn_left {
  transform: translateX(0%);
  transition-duration: 500ms;
}

.referral_button_item {
  width: 50%;
  text-align: center;
}

.wallet_section {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 25px;
  padding-bottom: 20px;
}

.wallet_button {
  border-radius: 7px;
  background: #AA1A17;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  cursor: pointer;
}

.referralInfo_space {
  border-radius: 10px;
  background: #151C28;
  max-height: 240px;
  height: 240px;
  padding: 15px 10px;
  overflow-y: scroll;
}

.referral_item {
  display: grid;
  grid-template-columns: 125px 72px 111px 42px 77px 20px;
  justify-content: space-between;
  gap: 10px;
  grid-auto-rows: 25px;
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}

.referralInfo_space::-webkit-scrollbar {
  width: 1px;
}

.referralInfo_space::-webkit-scrollbar-thumb {
  background: #AA1A17;
  border-radius: 3px;
  width: 2px;
}

.referralInfo_space::-webkit-scrollbar-track {
  background: #0D121A;
}

.referral_item:nth-child(2) {
  color: #8B929B;
}

.referral_item:nth-child(3) {
  color: #8B929B;
}

.referral_item:nth-child(2) {
  color: #8B929B;
}

.pointer {
  cursor: pointer;
}

.cursor_text {
  cursor: text;
  user-select: text;
}

.input {
  border-radius: 10px;
  background: #151C28;
  padding: 14px 15px;
}

.unactive {
  background: #151C28;
  transition: all 1s ease;
}

.loader {
  width: 25px;
  height: 25px;
  border: 1px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}
.referralInfo_space_item:nth-child(1){
  color: #FFFFFF;
}
.referralInfo_space_item{
  color: #8B929B;
}
.referralInfo_space_item:nth-child(3) {
  width: 111px;
  overflow-x: scroll;
}

.referralInfo_space_item::-webkit-scrollbar {
  display: none;
}
.success {
  color: #00FFA3;
}
.input{
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.16px;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
