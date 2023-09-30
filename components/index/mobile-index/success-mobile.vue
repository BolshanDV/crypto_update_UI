<template>
  <div class="success_section">
    <div class="success_header">
      <div class="success_title">
        УСПЕХИ
      </div>
      <div class="success_desc">
        последнее
      </div>
    </div>
    <div>
      <success/>
    </div>
  </div>
</template>

<script>
import Success from "@/components/index/Success.vue";

export default {
  name: "success-mobile",
  components: {Success}
}
</script>

<style scoped>
.success_section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: auto;
}
.success_title{
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
}
.success_desc{
  font-size: 16px;
  line-height: 24px;
  color: #AA1A17;
}
.success_header{
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.success_section-item {
  /*height: 55vh;*/
  /*background: #0D121A;*/
  /*border-radius: 8px;*/
  /*width: 100%;*/
}
</style>
