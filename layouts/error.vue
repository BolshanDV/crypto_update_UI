<template>
  <div class="error">
    <div class="error_herder error_element">
      404
    </div>
    <div class="error_title error_element">
      Где-то вы повернули не туда
    </div>
    <div class="error_text error_element">
      <span class="tap">Вернуться на </span>
      <span>
       <NuxtLink v-scroll-to="'#top'" to="/" class="navigation-link selected">
               домашнюю страницу
       </NuxtLink>
      </span>
    </div>
  </div>
</template>

<script>


export default {
  name: "error",
  layout: 'dashboard'
}
</script>

<style scoped>

.error {
  position: relative;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.error_element{
  display: flex;
  flex-direction: row;
}
.error_herder {
  font-weight: 600;
  font-size: 128px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 60px;
}

.error_title {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 15px;
}
.error_text{
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
}
.tap{
  margin-right: 4px;
}
</style>
