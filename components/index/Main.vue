<template>
  <div>
    <div class="main_section">
      <div class="description_block">
        <div class="description_block-item title">
          ЕДИНСТВЕННАЯ КРИПТО-ГРУППА НУЖНАЯ ВАМ
        </div>
        <div class="description_block-item text_desc">
          c:rypto - это группа, сочетающая в себе все, что нужно любому криптану, существующая с одной целью - упростить
          и
          автоматизировать работу и анализ в крипте. Информация по NFT на ETH и прочих актуальных блокчейнах,
          эксклюзивные
          предложения от партнеров. входящий в стоимость подписки набор тулзов и полная поддержка - все это вы найдете в
          c:rypto.
        </div>
        <div class="description_block-item title_second">
          <p>Выберите план подписки или ознакомьтесь с
            <span class="selected" v-scroll-to="'#features'" to="/">нашими преимуществами</span>
          </p>
        </div>
        <div class="description_block-item">
          <div class="btn_container">
            <div
              v-for="available_plan in available_plans"
              :key="available_plan.id"
            >
              <div class="btn_container-item"
                   @click="setPlanId(available_plan.id)"
                   v-bind:class="{ selected_item: available_plan.id === checkout['plan_id']}"
              >
                {{ available_plan.price }}$ / {{ available_plan.uiText }}
              </div>
              <div
                class="sale_section"
              >
                <div
                  v-if="available_plan.sale_percent !== 0"
                >
                  <s class="selected">{{ available_plan.price_without_sale }}$</s>
                  <span class="sale_percent">-{{ available_plan.sale_percent }}%</span>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div class="description_block-item">
          <div class="design_section">
            <div class="design_section-item">
              <div
                v-if="!checkout.plan_id"
                class="design_btn"
              >
                Оформить
              </div>
              <div
                v-else
                class="design_btn design_btn_active"
                @click="design"
              >
                Оформить
              </div>
            </div>
            <div class="design_section-item">
              <div class="text_desc">
                Мы принимаем только $USDT/$USDC/$BUSD в следующих сетях: ETH, BSC, SOL, POLYGON. Перед покупкой
                убедитесь
                что вы полностью прочитали инструкции по оплате и пользовательское соглащение
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="statistic_block">
<!--        <div class="statistic_block-item">-->
<!--          <div class="title_number">-->
<!--            {{ member_amount.current_member_amount }}-->
<!--          </div>-->
<!--          <div class="statistic_block_text">-->
<!--            текущих мемберов-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="statistic_block-item">-->
<!--          <div class="statistic_block_text">-->
<!--            из-->
<!--          </div>-->
<!--          <div class="title_number">-->
<!--            {{ member_amount.available_member_amount }}-->
<!--          </div>-->
<!--          <div class="statistic_block_text">-->
<!--            всего доступных мест-->
<!--          </div>-->
<!--          <div class="statistic_block_text_main">-->
<!--            Согласятся-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <div class="arrow_element">
      <div class="arrow one">
        <img src="../../assets/images/index/main/arrow.svg" alt="">
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "Main",
  data: () => ({
    member_amount: {},
    available_plans: []
  }),
  computed: {
    ...mapGetters('checkoutModule', ['checkout'])
  },
  mounted() {
    this.getMembersPreview();
    this.getPlans()
  },
  methods: {
    ...mapMutations('checkoutModule', ['setPlanId']),

    async getMembersPreview() {
      const response = await axios
        .get(`${process.env.PLAN_DETAILS_URL}/api/server/details/members/preview`)
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
        this.member_amount = response.objects
      }
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
    design() {
      if ((window.localStorage.getItem('timestamp') !== Date.now().toString()) && (window.localStorage.getItem('timestamp') !== null)) {
        this.$router.push('/payment')
      } else {
        this.$router.push('/checkout')
      }
    }
  }
}
</script>

<style scoped>
.main_section {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 10;
}

.description_block {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-right: 58px;
}

.statistic_block {
  width: 24%;
}

.title {
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
}

.description_block-item {
  margin-bottom: 28px;
  padding-right: 100px;
}

.description_block-item:first-child {
  margin-bottom: 30px;
  padding-right: 0;
}

.description_block-item:last-child {
  margin-bottom: 0;
}

.text_desc {
  color: #727A84;
  /*max-width: 600px;*/
}

.title_second {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
}

.selected {
  color: #AA1A17;
}

.btn_container {
  display: flex;
  flex-direction: row;
}

.btn_container-item {
  background: #151C28;
  border-radius: 10px;
  padding: 12px 30px;
  margin-right: 20px;
  font-size: 16px;
  line-height: 24px;
  color: #727A84;
  text-align: center;
}

.btn_container-item:last-child {
  margin-right: 0;
}

.selected_item {
  background: #AA1A17;
  color: #FFFFFF;
}

.design_section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.design_section-item:first-child {
  margin-right: 20px;
}

.design_btn {
  padding: 12px 48px;
  font-size: 19px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #727A84;
  background: #151C28;
  border-radius: 10px;
}

.design_btn_active {
  color: #FFFFFF;
  background: #AA1A17;
}

.statistic_block-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.statistic_block-item:first-child {
  background: #171E2B;
  border-radius: 20px 20px 0 0;
  padding: 30px 40px 15px;
}

.statistic_block-item:last-child {
  background: #0B1017;
  border-radius: 0 0 20px 20px;
  padding: 15px 25px 25px;
}

.title_number {
  font-weight: 700;
  font-size: 96px;
  line-height: 112px;
  color: #FFFFFF;
}

.statistic_block_text {
  color: #727A84;
  align-items: center;
}

.statistic_block_text_main {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-top: 15px;
}

.arrow_element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
}

.arrow {
  animation: arrowDown 2s infinite;
}
.sale_section{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px 20px 0 0;
}
.sale_percent{
  margin-left: 15px;
  color: #FFFFFF;
}
.circles--monitors {
  position: absolute;
  right: 0;
  top: -150px;
  z-index: 0;
}

@keyframes arrowDown {
  0% {
    bottom: 30px;
    opacity: 1;
  }
  100% {
    bottom: 0;
    opacity: 0;
  }
}

@media screen and (max-width: 800px) {
  /*.main_section {*/
  /*flex-direction: column;*/
  /*}*/
}
</style>
