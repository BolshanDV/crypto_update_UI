<template>
  <div>
    <div class="main_section"
         id="top-mobile"
    >
      <div class="statistic_block">
        <div class="description_block-item title">
          <div>
            ЕДИНСТВЕННАЯ
          </div>
          <div>
            КРИПТО-ГРУППА
          </div>
          <div>
            НУЖНАЯ
            <span class="selected">ВАМ</span>
          </div>
        </div>
      </div>
      <div id='payment-mobile' class="statistic_block_text description_block">
        Информация по NFT на ETH и прочих актуальных блокчейнах, эксклюзивные предложения от партнеров. входящий в
        стоимость подписки набор тулзов и полная поддержка - все это вы найдете в <span class="selected">c:rypto</span>
      </div>
      <div class="payment_section">
        <div class="description_block-item title">
          ВЫБЕРИТЕ ПЛАН ПОДПИСКИ ИЛИ ОЗНАКОМЬТЕСЬ С НАШИМИ
          <span class="selected">ПРЕИМУЩЕСТВАМИ</span>
        </div>
        <div class="double_column">
          <div class="payment_column_element">
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
                  :class="{price_section_first: available_plan.sale_percent === 0}"
                >
                  {{ available_plan.price }}$
                </div>
                <div
                  class="sale_section"
                >
                  <div
                    v-if="available_plan.sale_percent !== 0"
                  >
                    <s class="selected">{{ available_plan.price_without_sale }}$</s>
                    <span class="sale_percent">{{ available_plan.sale_percent }}%</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div class="double_column">
          <div class="second_element">
            <div class="design_section-item">
              <div
                v-if="!checkout.plan_id"
                class="design_btn"
              >
                Оформить
              </div>
              <NuxtLink
                v-else
                tag="div"
                to="/checkout"
                class="design_btn design_btn_active"
              >
                Оформить
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "main-mobile",
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

  }
}
</script>

<style scoped>
.main_section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.statistic_block {
  height: 63vh;
  margin-top: 45%;
}

.title {
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  margin-bottom: 40px;
}


.payment_section {
  margin: 50px 0 0;
}

.double_column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*margin-top: 20px;*/
}

.double_column:last-child {
  margin-top: 60px;
}

.selected {
  color: #AA1A17;
}

.payment_column_element {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.btn_container {
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: flex-start;*/
  /*align-items: center;*/
  /*flex-wrap: wrap;*/

  display: grid;
  gap: 25px;
  grid-template-columns: repeat(2, 150px);
}

.btn_container-item {
  background: rgba(13, 18, 26, 1);
  border-radius: 10px;
  padding: 5px 10px;
  height: 92px;
  color: #8B929B;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  box-shadow: 0 7px rgba(21, 28, 40, 1);
  cursor: pointer;
  min-height: 80px;
  transition: all .5s ease 0s;
}
.btn_container-item:active{
  box-shadow: 0 2px rgba(170, 26, 23, 1);
  transform: translateY(5px);
}

.second_element {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.selected_item {
  color: #FFFFFF;
  box-shadow: 0 7px rgba(170, 26, 23, 1);
}

.design_section {
  display: flex;
  flex-direction: row;
  align-items: center;
}


.design_btn {
  padding: 12px 30px;
  font-size: 16px;
  line-height: 19px;
  background: #151C28;
  border-radius: 8px;
  color: #727A84;
  text-align: center;
}

.design_btn_active {
  color: #FFFFFF;
  background: #AA1A17;
}

.statistic_block_text {
  color: #727A84;
  align-items: center;
  margin-bottom: 13px;
  font-size: 16px;
  line-height: 19px;
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

.persent_section {
  margin-left: 10px;
}

.struct_out {
  color: #9e1613;
}

.struct_out_active {
  color: #FFFFFF;
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

</style>
