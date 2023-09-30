<template>
  <div class="main_section">
    <div class="main_section-title">
      <span>Оплата</span>
    </div>
    <div class="payment_section">
      <div class="payment_section-item">
        <div class="payment_description">
          <span class="selected">Спасибо</span> за вашу покупку. Будем рады работать с вами
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          ВАШ ЛИЦЕНЗИОННЫЙ КЛЮЧ
        </div>
        <div
          class="input_element-btn">
          <div class="input">{{identifier}}</div>
          <div
            @click="copy_license_key(identifier)"
            class="input_btn"
          >
            <svg :class="{active: copyFlag === 'success'}"
                 width="15" height="15" viewBox="0 0 15 15" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path :class="{active: copyFlag === 'success'}"
                    d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'success'}"
                    d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'success'}" d="M7.23975 1H9.83975" stroke="white" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'success'}" d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'success'}"
                    d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              <path :class="{active: copyFlag === 'success'}"
                    d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
                    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          АКТИВАЦИЯ
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          1 Перейдите в
          <span class="selected">
            <NuxtLink to="dashboard" class="selected">Дешборд</NuxtLink>
          </span>
          и залогиньтесь с вашим Discord аккаунтом
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          2 Введите ваш ключ: HBYSLPPOOI321JKJ
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          3 Перейдите в дискорд и вы увидите что были добавлены на сервер c:rypto
        </div>
      </div>
      <div class="payment_section-item">
        <div class="payment_description">
          4 Ознакомьтесь с каналом <a href="https://discord.gg/a4GN6xY9kq" class="selected">#starting-info</a>, изучайте и наслаждайтесь
        </div>
      </div>
      <div class="additional_information">
        <div class="payment_description">
          Мы также отправили инструкции по активации и ваш лицензионный ключ вам на почту, можете закрывать это окно
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "success_payment",
  data() {
    return {}
  },
  props:['identifier'],
  computed: {
    ...mapGetters('checkingScreen', ['copyFlag'])

  },
  methods: {
    ...mapActions('checkingScreen', ['changeCopyFlag']),
    async copy_license_key(identifier) {
      let text = identifier
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag('success')
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
  font-family: Montserrat;
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
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
}
.additional_information{
  margin-top: 80px;
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
}

.button {
  background: #151C28;
  border-radius: 8px;
  padding: 12px 29px;
  color: #727A84;
}

.input_btn {
  background: #0D121A;
  cursor: pointer;
}
.input_element-btn{
  cursor: text;
}
.button_active {
  background: #AA1A17;
  border-radius: 8px;
  color: #FFFFFF;
}
.selected{
  font-size: 14px;
  line-height: 20px;
}
</style>
