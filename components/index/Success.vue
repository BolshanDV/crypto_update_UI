<template>
  <div class="success_section">
    <div class="image_section">
      <img
        src="../../assets/images/index/success/discord_background.svg"
        class="discord"
        alt="">
    </div>
    <div class="success_section-element">
      <div
        v-for="success in successes"
        :key="success.id"
        class="success_item"
      >
        <div class="headline">
          {{success.headline}}
        </div>
        <div class="success_type">
          {{success.success_type}}
        </div>
        <div class="description">
          {{success.description}}
        </div>
        <div class="information_section">
          <div class="information_section_item">
            <div class="information_section_item-title">
              Заработано
            </div>
            <div class="information_section_item-data">
              <span class="success">~{{success.profit}}$</span> за 1 акк
            </div>
          </div>
          <div class="information_section_item">
            <div class="information_section_item-title">
              Вложения
            </div>
            <div class="information_section_item-data">
              {{ success.investment }}$
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Success",
  data(){
    return {
      successes: []
    }
  },
  mounted() {
    this.getSuccesses()
  },
  methods:{
     async getSuccesses() {
       const response = await axios
         .get(`${process.env.PLAN_DETAILS_URL}/api/success`)
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
          this.successes = response.objects
       }
     },
   }
}
</script>

<style scoped>
.success_section {
  display: flex;
  height: 592px;
  flex-direction: row;
  justify-content: space-between;
  /*background-image: url("~@/assets/images/index/success/discord_background.svg");*/
  background-size: 100%;
  position: relative;
  z-index: 10;
  width: 1280px;
  /*background: #0D121A no-repeat;*/
}

.success_section-element {
  width: 455px;
  height: 547px;
  background: #0D121A;
  border: 3px solid #151C28;
  border-radius: 8px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  /*margin-left: 20px;*/
}
.success_section-element::-webkit-scrollbar {
  width: 1px;
}
.success_section-element::-webkit-scrollbar-thumb {
  background: #AA1A17;
  border-radius: 3px;
  width: 2px;
}
.success_section-element::-webkit-scrollbar-track {
  background: #0D121A;
}
.headline{
  font-size: 22px;
  line-height: 26px;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 5px;
}
.success_type{
  font-size: 16px;
  line-height: 19px;
  color: #AA1A17;
  margin-bottom: 15px;
}
.description{
  color: #727A84;
}
.information_section{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
.information_section_item-title{
  color: #FFFFFF;
  margin-bottom: 7px;
}
.success{
  color: #00FFA3;
}
.information_section_item{
  display: flex;
  flex-direction: column;
  width: 50%;
}
.information_section_item-data{
  color: #FFFFFF;
}
.success_item{
  padding-bottom: 20px;
  margin-top: 20px;
  border-bottom: 2px solid rgba(37, 42, 49, 1);
}
.success_item:first-child{
  margin-top: 0;
}
.image_section{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.discord{
  width: 701px;
}
@media screen and (width < 850px) {
  .image_section{
    display: none;
  }
  .success_section-element{
    padding: 20px 15px;
    width: 304px;
    height: 485px;
  }
  .success_section{
    height: 485px;
    background: none;
  }
}
</style>
