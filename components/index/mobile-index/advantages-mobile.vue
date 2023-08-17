<template>
  <div class="features" id="features-mobile">
    <div class="features_header">
      <div class="features_section-title-item title">
        ПРЕИМУЩЕСТВА
      </div>
    </div>
    <div class="features_main">
      <div class="features_main_item"
           v-for="(advantage, index) of advantages"
           :key="index"
      >
        <div class="feature__header">
          <div class="feature__icon-wrapper">
            <img class="feature__icon" :src="advantage.icon" :alt="advantage.title">
          </div>
          <div class="feature_header-text">
            {{ advantage.title }}
          </div>
        </div>
        <div class="feature_content">
          {{ advantage.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "advantages-mobile",
  data() {
    return {
      advantages: [
        {
          icon: require('@/assets/images/index/advantages/info.svg'),
          title: 'Информация о дропах',
          content: 'Вы не пропустите ни один предстоящий дроп NFT, сейл, щиток и прочее.Мы предоставляем всю необходимую информацию.'
        },
        {
          icon: require('@/assets/images/index/advantages/guides.svg'),
          title: 'Гайды',
          content: 'Инструкции по работе с различными направлениями и инструментами, которые будут полезны и опытному криптану и новичку.'

        },
        {
          icon: require('@/assets/images/index/advantages/groupbuys.svg'),
          title: 'Софт',
          content: 'Эксклюзивное программное обеспечение, позволяющее многократно улучшить ваш опыт работы в крипте.'

        },
        {
          icon: require('@/assets/images/index/advantages/support.svg'),
          title: 'Ретродропы',
          content: 'Мы следим за всеми актуальными проектами, которые имеют потенециал к аирдропу и освещаем все важные активности в них.'

        },
        {
          icon: require('@/assets/images/index/advantages/predictions.svg'),
          title: 'Сигналы',
          content: 'Наши трейдеры регулярно мониторят рынок и дают сигналы не только на прибыльные сделки по фьючам, но и работу со спотом.'

        },
        {
          icon: require('@/assets/images/index/advantages/community.svg'),
          title: 'Дружелюбное сообщество',
          content: 'Коммьюнити опытных криптанов, трейдеров и абузеров, которые повидали многое в крипте и засчет своего опыта ответят на любой вопрос.'

        }

      ]
    }
  }
}
</script>

<style scoped>
.features {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.features_header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.features_section-title-item {
  font-size: 20px;
  line-height: 23px;
}

.text_desc {
  text-align: center;
}

.features_main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features_main_item {
  border-radius: 8px;
  margin-bottom: 40px;
}

.feature__header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.feature__icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.feature__icon {
  width: 100%;
  height: 100%;
}

.feature_header-text {
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}

.feature_content {
  color: #727A84;
}

</style>
