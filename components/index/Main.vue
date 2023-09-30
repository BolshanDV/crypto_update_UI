<template>
  <div>
    <div class="main_section">
      <div class="description_block">
        <div class="description_block-item title">
          ЕДИНСТВЕННАЯ КРИПТО-ГРУППА НУЖНАЯ <span class="selected_title">ВАМ</span>
        </div>
        <div class="description_block-item text_desc">
          c:rypto - это приватная группа, сочетающая в себе все, что нужно любому криптану, существующая с одной целью -
          упростить и автоматизировать работу и анализ в крипте. Информация по NFT на ETH и прочих актуальных
          блокчейнах, гайды, информация по ретродропам, входящий в стоимость подписки набор тулзов и полная поддержка -
          все это вы найдете у нас.
        </div>
        <div class="description_block-item title_second">
          <p>Выберите план подписки или ознакомьтесь с
            <span class="selected" v-scroll-to="'#features'" to="/">нашими преимуществами</span>
          </p>
        </div>
        <div class="description_block-item">
          <transition name="mode-fade" mode="out-in">
            <div class="btn_container">
              <div
                class="btn_container-item"
                v-for="(available_plan, index) in available_plans"
                v-bind:class="{ selected_item: available_plan.id === checkout['plan_id']}"
                :key="available_plan.id"
                @click="setPlanId(available_plan.id)"
              >
                <div class="time_section">{{ available_plan.uiText }}</div>
                <div
                  class="price_section"
                  :class="{price_section_first: available_plan.sale_percent >= 0}"
                >
                  {{ available_plan.price }}$
                </div>
                <div
                  class="sale_section"
                >
                  <div
                    v-if="available_plan.sale_percent < 0"
                  >
                    <s class="selected">{{ available_plan.price_without_sale }}$</s>
                    <span class="sale_percent">{{ available_plan.sale_percent }}%</span>
                  </div>
                </div>

              </div>

            </div>
          </transition>
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
                что вы полностью прочитали
                <nuxt-link to="/payment_instruction" class="selected">инструкции по оплате</nuxt-link>
                и
                <nuxt-link to="/terms" class="selected">пользовательское соглащение</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="arrow_element">-->
    <!--      <div class="arrow one">-->
    <!--        <img src="../../assets/images/index/main/arrow.svg" alt="">-->
    <!--      </div>-->
    <!--    </div>-->
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
    ...mapGetters('checkoutModule', ['checkout']),

  },
  mounted() {
    this.getMembersPreview();
    this.getPlans()
  },
  methods: {
    ...mapMutations('checkoutModule', ['setPlanId']),

    async getMembersPreview() {
      // const response = await axios
      //   .get(`${process.env.PLAN_DETAILS_URL}/api/server/details/members/preview`)
      //   .then(resObj => {
      //     return {
      //       objects: resObj.data,
      //       status: resObj.status
      //     };
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // if (response.status === 200) {
      //   this.member_amount = response.objects
      // }
    },
    sorterPlans(field) {
      return (a, b) => a[field] > b[field] ? 1 : -1;
    },
    async getPlans() {
      let url = ''
      if (localStorage.referralCode) {
        url = '?referralCode=' + localStorage.referralCode
      }
      const response = await axios
        .get(`${process.env.PLAN_DETAILS_URL}/api/plans/usd-crypto/initial/available${url}`)
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
              plan.uiText = "1 месяц";
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
  justify-content: flex-start;
  z-index: 10;
  padding: 0 0 0 5%;
}

.description_block {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-right: 58px;
}


.title {
  font-size: 36px;
  letter-spacing: 0.01em;
  color: #FFF;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.selected_title {
  color: #AA1A17;
}

.description_block-item {
  margin-bottom: 28px;
}

.description_block-item:first-child {
  margin-bottom: 30px;
  padding-right: 0;
}

.description_block-item:last-child {
  margin-bottom: 0;
}

.text_desc {
  color: #8B929B;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.title_second {
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.2px;
}

.selected {
  color: #AA1A17;
}

.btn_container {
  display: flex;
  flex-direction: row;
  /*margin-top: 10px;*/
}

.btn_container-item {
  background: rgba(13, 18, 26, 1);
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 20px;
  width: 150px;
  color: #8B929B;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  box-shadow: 0 7px rgba(21, 28, 40, 1);
  cursor: pointer;
  transition: all .5s ease 0s;
  min-height: 80px;
}

.btn_container-item:hover {
  background: rgba(21, 28, 40, 1);
}

.btn_container-item:active {
  box-shadow: 0 2px rgba(170, 26, 23, 1);
  transform: translateY(5px);
}

.time_section {
  border-bottom: solid rgba(139, 146, 155, 1);
}

.price_section {
  font-family: Roboto,sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}

.price_section_first {
  height: 50%;
}

.btn_container-item:last-child {
  margin-right: 0;
}

.selected_item {
  color: #FFFFFF;
  box-shadow: 0 7px rgba(170, 26, 23, 1);
}

.design_section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
}

.design_section-item:first-child {
  margin-right: 20px;
}

.design_section-item:last-child {
  margin-right: 150px;
}

.design_btn {
  padding: 12px 48px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #727A84;
  background: #151C28;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.design_btn_active {
  color: #FFFFFF;
  background: #AA1A17;
  cursor: pointer;
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

.sale_section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px 0 0 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

.sale_percent {
  margin-left: 10px;
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


}
</style>
