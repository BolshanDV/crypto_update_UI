<template>
  <div class="statistics_section">
    <div class="statistic_header">
      Статистика
    </div>
    <div class="statistic_body">
      <div class="statistic_element">
        <div class="statistic_element_title">
          Всего заработано
        </div>
        <div class="statistic_element_data success">
          {{referralDetails.stats.total_earned}}$
        </div>
      </div>
      <div class="statistic_element">
        <div class="statistic_element_title">
          Всего выплачено
        </div>
        <div class="statistic_element_data">
          {{referralDetails.stats.total_payout}}$
        </div>
      </div>
      <div class="statistic_element">
        <div class="statistic_element_title">
          Скидка по вашему коду
        </div>
        <div class="statistic_element_data">
          {{referralDetails.stats.discount_percent}}%
        </div>
      </div>
      <div class="statistic_element">
        <div class="statistic_element_title">
          Ваш процент с продаж
        </div>
        <div class="statistic_element_data">
          {{referralDetails.stats.share_percent}}%
        </div>
      </div>
      <div class="statistic_element">
        <div class="statistic_element_title">
          Выплат выполнено
        </div>
        <div class="statistic_element_data success">
          {{referralDetails.stats.made_payouts}}
        </div>
      </div>
      <div class="statistic_element">
        <div class="statistic_element_title">
          Выплат в процессе
        </div>
        <div class="statistic_element_data">
          {{referralDetails.stats.waiting_payouts}}
        </div>
      </div>
    </div>
    <div>
      <div class="statistic_description">
        Выплаты по рефералам производятся ежемесячно в 1-10 числах каждого месяца. Выпллаты производится в
        <span class="selected">$USDT</span> или же <span class="selected">$USDC</span> в сети Arbitrum.
      </div>
      <div class="statistic_description">
        Убедитесь что введенный вам кошелек для выплат является EVM кошельком и поддерживает следующие сети: BSC/ ETH/
        POLYGON/ ARB/ AVAX.
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "referralStatistics",
  computed:{
    ...mapGetters('referralModule', ['referralDetails'])
  }
}
</script>

<style scoped>
.statistic_header {
  color: #FFFFFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Montserrat, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  padding-bottom: 15px;
}

.statistic_body {
  height: 320px;
  border-radius: 10px;
  background: #151C28;
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 40px;
  padding: 20px 30px;
}
.statistic_element{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /*background: #2a384f;*/
}
.statistic_element_title {
  color: #727A84;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  margin-bottom: 12px;
}

.statistic_element_data {
  color: #FFF;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Montserrat', serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px; /* 100% */
}

.statistic_description {
  color: #727A84;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 15px;
}

.statistic_description:last-child {
  margin-bottom: 10px;
}
.success{
  color: #00FFA3;
}
</style>
