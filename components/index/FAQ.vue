<template>
  <div class="faq" id="faq">
    <div class="faq_header">
      <div class="faq_section-title-item title">
        ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
      </div>
      <div class="features_section-title-item text_desc">
        Ниже, вы можете найти ответы на самые частозадаваемые вопросы, но если у вас все же останутся вопросы, то можете задать им нам в нашем
        <span class="selected">телеграм-чате</span>
      </div>
    </div>
    <div class="faq_main">
      <div class="faq_main_item"
           v-for="(question, index) of questions"
           :key="index"
           @click="clickOnQuestion(question)"
      >
        <div class="faq_question">
          <div class="faq_question-text">
            {{ question.text }}
          </div>
          <div class="icon_faq" :class="{'question_arrow-open': question.isOpen}">
            <img src="../../assets/images/index/faq/faq_arrow.svg" alt="">
          </div>
        </div>
        <div v-show="question.isOpen" class="faq_answer">
          {{ question.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      questions: [
        {
          text: 'Что если я новичок в крипте?',
          answer: 'Если вы готовы учиться, то ничего страшного. В нашем сообществе собраны люди с разным уровнем знаний, но всех их объединяет желание развиваться и зарабатывать больше. У нас есть множество гайдов по актуальным направлениям работы, а также опытная команда модераторов, которая всегда ответит на интересующие вас вопросы. Помните, что кнопки “бабло” не существует, но наша информация плюс ваш упорный труд – путь к успеху в крипте. ',
          isOpen: false
        },
        {
          text: 'Какой нужен минимальный банк для начала работы?',
          answer: 'Зависит от направления, в котором вы хотите стартовать, например, для успешного входа в трейдинг и соблюдения риск-менеджмента наши модераторы рекомендуют иметь от 1000$. Однако, для работы с NFT и ретродропами вам нужно куда меньше и изначальный депозит в несколько сотен долларов вполне подойдёт.',
          isOpen: false
        },
        {
          text: 'Что будет если не оплатить подписку?',
          answer: 'По окончанию даты подписки для вас перестанут быть доступны большинство разделов нашего Discord-сервера. Чтобы снова получить к ним доступ, необходимо выбрать план подписки и совершить оплату.',
          isOpen: false
        },
        {
          text: 'Могу ли я вернуть деньги, если мне не понравилось?',
          answer: 'Оплачивая подписку на c:rypto вы соглашаетесь с нашими Terms of Service. К сожалению, вернуть средства за оплаченную подписку не получится. Однако, если вы потеряли доступ к Discord-аккаунту с оплаченной подпиской, то открывайте тикет на сервере или пишите напрямую нам – перенесем подписку на другую учетную запись.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    clickOnQuestion(question) {
      if (question.isOpen) {
        question.isOpen = !question.isOpen
      } else {
        this.questions.forEach((item) => {
          item.isOpen = false
        })

        question.isOpen = true
      }
    }
  }
}
</script>

<style scoped>
.faq {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}

.faq_header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-bottom: 60px;
}

.faq_section-title-item:first-child {
  margin-bottom: 20px;
  text-align: center;
}

.faq_section-title-item:last-child {
  width: 90%;
}

.text_desc {
  text-align: center;
  width: 80%;
}

.faq_main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.faq_main_item {
  background: #0D121A;
  border-radius: 8px;
  padding: 27px 24px 24px 24px;
  margin-bottom: 15px;
}

.faq_question-text {
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}

.faq_question {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.faq_answer {
  color: #727A84;
  margin-top: 15px;
}

.question_arrow-open {
  transform: rotate(180deg);
}
@media screen and (max-width: 640px){
  .faq {
    margin-top: 100px;
  }
  .faq__info {
    margin-bottom: 48px;
  }

  .question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 18px 24px;

  }
  .question__answer {
    padding-top: 18px;
  }
}
</style>
