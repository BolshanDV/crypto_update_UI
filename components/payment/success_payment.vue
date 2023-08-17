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
            <img src="../../assets/images/payment/copy.svg" alt="">
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
          4 Ознакомьтесь с каналом <span class="selected">#starting-info</span>, изучайте и наслаждайтесь
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
export default {
  name: "success_payment",
  data() {
    return {}
  },
  props:['identifier'],
  methods: {
    async copy_license_key(identifier) {
      let text = identifier
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
