<template>
  <div class="instruction_block">
    <div class="instruction_section">
      <div class="instruction_element">
        <p class="main_instruction_title">Инструкция по оплате</p>
      </div>
      <div class="instruction_element">
        <p class="instruction_text">Данная инструкция относится как к продлению, так и к покупке подписки. </p>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Выбор плана подписки</p>
        <p class="instruction_text block_element">Первое что вам необходимо сделать для покупки или же продления
          подписки - выбрать план
          подписки. На выбор доступно 3 варианта:</p>
        <div class="instruction_text ">
          1. 80$ за 1 месяц
        </div>
        <div class="instruction_text">
          2. 400$ за 6 месяцев
        </div>
        <div class="instruction_text block_element">
          3. 700$ за 12 месяцев/1 год
        </div>
        <div class="instruction_text">
          После выбора плана подписки кнопка <span class="selected">Оформить</span> станет активной. Для перехода на
          следующий этап, нажмите на кнопку <span class="selected">Оформить</span>.
        </div>
        <div class="img_element">
          <img src="../assets/images/paymentInstruction/design.png" class="design" alt="">
        </div>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Оформление заказа</p>
        <p class="instruction_text block_element">Данный этап касается только первичной покупки подписки.</p>
        <p class="instruction_text block_element">Для оформления заказа вам обязательно потребуется ввести email и, при
          наличии, реферальный код. Email будет использован в качестве уникального индикатора вашего заказа/платежа,
          также на ваш email будет отправлен лицензионный ключ с инструкицей по его активации.</p>
        <div class="img_element">
          <img src="../assets/images/paymentInstruction/checkout.png" class="checkout" alt="">
        </div>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Выбор способа оплаты</p>
        <p class="instruction_text block_element">После ввода email и нажатия на кнопку <span class="selected">Перейти к оплате</span>,
          вы увидите
          окно выбора способа оплаты.</p>
        <p class="instruction_text block_element">В правом верхнем углу вы также можете найти таймер, который отражает
          время, которое осталось у вас на то, чтобы оплатить, зарезервированный за вами лицензионный ключ. По истечению
          данного таймера, ваш резерв будет отменен, а заказ аннулирован. Исключение составляют толдько те случаи, когда
          ваша транзакция находится в pending’е, в данном случае окно будет открыто до тех пор, пока статус вашей
          транзакции не изменится на success или failed. </p>
        <p class="instruction_text block_element">Первое что потребуется от вас здесь - выбрать на ту сеть, в которой вы
          хотели бы оплатить ваш заказ. </p>
        <div class="img_element">
          <img src="../assets/images/paymentInstruction/payment.png" class="checkout" alt="">
        </div>
      </div>
      <div class="instruction_element">
        <p class="instruction_text block_element">После того, как вы выбрали сеть, в поле “Отправьте <span
          class="selected">70/400/700</span> (сумма будет меняться в зависимости от выбранного вами плана) <span
          class="selected">$USDT</span> или <span class="selected">$USDC</span>” у вас появится адрес для отправки
          средств. </p>
        <p class="instruction_text block_element">Для того чтобы скопировать появивщийся адрес либо выделите его и
          скопируйте с помощью правой кнопки мыши, либо нажмите на кнопку “скопировать” рядом с адресом. </p>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Отправка средств</p>
        <p class="instruction_text block_element">Отправить средства на указанный адрес, вы можете любым из удобных вам
          способов, например, через кошельки Metamask (ETH, BSC, Polygon) или Phantom (Solana) или же с вашего счета на
          бирже (Binance, Bybit и прочие). </p>
        <div class="instruction_text block_element">
          <span class="selected">Главное</span>, чтобы средства были отправлены на <span class="selected">указанный адрес</span>
          и в, <span class="selected">выбранной вами</span>, сети. Если средства будут отправлены не в той сети или же
          не на тот адрес, они будут утеряны и мы не будем нести ответственности за это.
        </div>
        <div class="instruction_text block_element">
          Если вы ранее не пользовались кошельком Metamask и не знаете как отправить средства, то рекомендуем
          ознакомиться с данным
          <a class="selected" href="https://www.youtube.com/watch?v=_nJBCrv0eO0">видео-гайдом.</a></div>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Проверка транзакции</p>
        <p class="instruction_text block_element">Для проверки транзакции нам понадобится ее хеш - уникальный
          идентификатор транзакции. </p>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Чтобы получить хеш транзакции в Metamask вам нужно будет: </p>
        <p class="instruction_text block_element">
          1. Нажать на транзакцию отправки в вашем Metamask</p>
        <div class="img_element_ex">
          <img src="../assets/images/paymentInstruction/examp_metamask.png" class="examp_metamask" alt="">
        </div>
        <p class="instruction_text block_element">
          2. Нажать на кнопку <span class="selected">“Скопировать ID транзакции”</span>
        </p>
        <div class="img_element_ex">
          <img src="../assets/images/paymentInstruction/examp1_metamask.png" class="examp1_metamask" alt="">
        </div>
      </div>
      <div class="instruction_element">
        <p class="instruction_title block_element">Чтобы получить хеш транзакции при выводе с Binance:</p>
        <p class="instruction_text block_element">
          1. Перейти в раздел “Вывод” в вашем кошельке и нажать на транзакцию вывода</p>
        <div class="img_element_ex">
          <img src="../assets/images/paymentInstruction/hash_ex.png" class="hash_ex" alt="">
        </div>
        <p class="instruction_text block_element">
          2. В самом низу окна Детали вывода средств, находите TxID и нажимаете на кнопку <span class="selected">Копирировать</span>
        </p>
        <div class="img_element_ex">
          <img src="../assets/images/paymentInstruction/hash_ex1.png" class="hash_ex1" alt="">
        </div>
        <p class="instruction_text block_element">
          После того, как вы скопировали хеш транзакции, вам нужно будет вставить его в поле “<span class="selected">Ссылка на транзакцию/хеш</span>”
          и нажать на кнопку
          “<span class="selected">Проверить транзакцию</span>”
        </p>
      </div>
      <div class="instruction_element">
        <p class="instruction_text block_element">
          1После нажатия на кнопку “<span class="selected">Проверить транзакцию</span>” наша система автоматически
          начнет поиск и проверку вашей
          транзакции в блокчейне и вы увидите иконку загрузки внутри кнопки. Проверка может занять от нескольких секунд
          до нескольких минут. Если транзакция прошла успешно и была переведена нужная сумма, то вас перекинет на
          финальное окно успешной покупки с вашим лицензионным ключем и инструкциями по активации. Ключ и интрукции по
          активации также будут продублированы на вашу почту, указанную при оформлении.</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "payment_instruction"
}
</script>

<style scoped>
.instruction_section {
  width: 1060px;
  margin: 70px 0 350px;
}

.instruction_block {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.main_instruction_title {
  color: #FFF;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
}

.instruction_title {
  color: #FFF;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.14px;
}

.instruction_text {
  color: #727A84;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.14px;
}

.instruction_element {
  margin-bottom: 50px;
}

.block_element {
  margin-bottom: 15px;
}

.img_element {
  margin: 40px 0;
}

.design {
  width: 817px;
  height: 230px;
}

.checkout {
  width: 1059px;
  height: 296px;
}

.examp_metamask {
  width: 358px;
  height: 128px;
  flex-shrink: 0;
}

.examp1_metamask {
  width: 316px;
  height: 232px;
  flex-shrink: 0;
}

.hash_ex {
  width: 615px;
  height: 132px;
  flex-shrink: 0;
}

.hash_ex1 {
  width: 467px;
  height: 140px;
  flex-shrink: 0;
}

.img_element_ex {
  margin: 15px 0 40px;
}

@media screen and (width < 850px) {

  .design, .checkout, .examp_metamask, .examp1_metamask, .hash_ex, .hash_ex1 {
    max-width: 100%;
    height: auto;
  }

  .instruction_section {
    width: 100%;
    padding: 0 20px;
  }

}
</style>
