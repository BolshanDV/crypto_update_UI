<template>
  <div class="faq" id="faq">
    <div class="faq_header">
      <div class="faq_section-title-item title">
        ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
      </div>
      <div class="features_section-title-item text_desc">
        Ниже, вы можете найти ответы на самые частозадаваемые вопросы, но если у вас все же останутся вопросы, то можете
        задать им нам в нашем
        <a
          class="selected"
          href="https://t.me/cmd_crypto"
        >телеграм-чате
        </a>
      </div>
    </div>
    <div class="faq_main">
      <transition-group name="list" tag="div">
        <div class="faq_main_item"
             v-for="(question, index) of questions"
             :key="question.answer"
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
          <div
            v-show="question.isOpen"
            class="faq_answer"
            v-html="question.answer"
          >
          </div>
        </div>
      </transition-group>
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
          answer: 'Оплачивая подписку на c:rypto вы соглашаетесь с нашими пользовательсикими соглашениями. К сожалению, вернуть средства за оплаченную подписку не получится. Однако, если вы потеряли доступ к Discord-аккаунту с оплаченной подпиской, то открывайте <a href="https://discord.gg/a4GN6xY9kq" class="selected"">тикет</a> на сервере или пишите <a href="https://vk.com/cmd_crypto" class="selected">напрямую нам</a> – перенесем подписку на другую учетную запись.',
          isOpen: false
        },
        {
          text: 'Я оплатил подписку, зашел на сервер. Что дальше, как начать зарабатывать?',
          answer: 'Для начала перейдите в раздел #starting-info в <a href="https://discord.gg/a4GN6xY9kq" class="selected">Discord канале c:rypto</a>, там вы сможете найти всю необходимую стартовую информацию, но если у вас останутся вопросы, вы всегда сможете задать из в чате или же создав тикет в разделе #support\n',
          isOpen: false
        },
        {
          text: 'Что делать, если я оплатил, но не получил доступ на сервер?',
          answer: 'Если транзакция с нужной суммой, в указанном вами блокчейне в USDT или же USDC прошла, но вы так и не получили уведомление о успешной покупке или же письмо на почту, то вы можете написать нам в <a href="https://vk.com/cmd_crypto" class="selected">вк</a> или же создать тикет в <a href="https://discord.gg/a4GN6xY9kq" class="selected">нашем дискорде</a>.',
          isOpen: false
        },
        {
          text: 'Я отлично разбираюсь в крипте и хочу попасть к вам в команду. Как это сделать?',
          answer: 'Мы всегда рады новым участникам в нашей команде, поэтому на постоянной основе, для всех желающих открыта <a href="https://forms.gle/WQdzZ1f48b2rucBW7" class="selected">форма</a> по набору модераторов.',
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
  width: 1200px;
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
  width: 55%;
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
  height: 640px;
}

.faq_main_item {
  background: #0D121A;
  border-radius: 8px;
  padding: 24px 24px 22px 24px;
  margin-bottom: 15px;
  transition: all 0.5s ease-out;
  animation-name: move;
  cursor: pointer;
}
@keyframes move{
  0%{
    left: 0%;
  }
  50%{
    border-radius: 0%;
  }
  100%{
    left: 50%;
  }
}
.faq_question-text {
  font-size: 17px;
  line-height: 20px;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
}

.faq_question {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.faq_answer {
  color: #8B929B;
  margin-top: 15px;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;
}

.question_arrow-open {
  transform: rotate(180deg);
}

@media screen and (max-width: 640px) {
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
