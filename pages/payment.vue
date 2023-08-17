<template>
  <div class="payment">
    <Payment
      v-if="success_result_flag === null"
      :success_result="success_result"
    />
    <Success_payment
      v-else
      :identifier="success_result_flag"
    />

  </div>
</template>

<script>
import Success_payment from "@/components/payment/success_payment.vue";

export default {
  name: "payment",
  components: {Success_payment},
  layout: "dashboard",
  data(){
    return{
      success_result_flag: null
    }
  },
  methods: {
    success_result(data){
      this.success_result_flag = data
    }
  }
}
</script>

<style scoped>
.payment{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 4vh 5vw 15vh;
  position: relative;
  z-index: 100;
  /*height: 85vh;*/
}
</style>
