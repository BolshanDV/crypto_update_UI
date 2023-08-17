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
              <div class="btn_container-item"
                   v-for="available_plan in available_plans"
                   :key="available_plan.id"
                   @click="setPlanId(available_plan.id)"
                   v-bind:class="{ selected_item: available_plan.id === checkout['plan_id']}"
              >
                <span>
                  {{ available_plan.price }}$/{{ available_plan.uiText }}
                </span>
                <span

                  class="price_section"
                  v-if="available_plan.sale_percent"
                >
                  <s
                    class="struct_out"
                    v-bind:class="{ struct_out_active: available_plan.id === checkout['plan_id']}"
                  >
                    {{ available_plan.price }}$
                  </s>
                  <span class="persent_section">{{ available_plan.sale_percent }}%</span>
                </span>
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
                ОФОРМИТЬ
              </div>
              <NuxtLink
                v-else
                tag="div"
                to="/checkout"
                class="design_btn design_btn_active"
              >
                ОФОРМИТЬ
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
              plan.uiText = "мес";
              break;
            case 3:
              plan.uiText = "3 меc";
              break;
            case 6:
              plan.uiText = "6 мес";
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

.btn_container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}

.btn_container-item {
  background: #151C28;
  border-radius: 10px;
  padding: 12px 35px;
  margin-bottom: 18px;
  font-size: 16px;
  line-height: 19px;
  color: #727A84;
  text-align: center;
  width: 60%;
}

.btn_container-item:last-child {
  margin-right: 0;
}

.second_element {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.selected_item {
  background: #AA1A17;
  color: #FFFFFF;
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

.price_section {
  margin-left: 20px;
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
