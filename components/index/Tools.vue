<template>
  <div class="tools_section">
    <div class="tools_section-title">
      <div class="tools_section-title-item title" id="soft">
        ЭКСКЛЮЗИВНЫЕ ТУЛЗЫ
      </div>
      <div class="tools_section-title-item text_desc">
        Эксклюзивно для наших мемберов мы предоставляем ряд инструментов, <span class="selected">входящих в стоимость подписки</span>.
        <div><span class="selected">Нажмите</span> на любой, чтобы узнать больше</div>
      </div>
    </div>
    <div class="tools_exs">
      <div class="tools_exs-item">
        <transition name="mode-fade" mode="out-in">
          <img
            :src="tools[selected_tool].image"
            alt=""
            :key="tools[selected_tool].name"
            class="image_joiner">
        </transition>
      </div>
      <div class="tools_exs-item">
        <transition name="mode-fade" mode="out-in">
          <div
            :key="tools[selected_tool].name"
            class="text_desc desc_element"
          >
            <span class="selected">{{ tools[selected_tool].name }}</span> {{ tools[selected_tool].description }}
          </div>
        </transition>
        <div class="tools_link">
          <div
            class="tools_link-item"
            v-for="(tool, index) in tools"
            :key="index"
            @click="select_tool(index)"
          >
            <div class="tools_link-item_header">
              {{ tool.title }}
            </div>
            <div
              class="tools_link-item_btn"
              :class="{tools_link_item_btn: tool.isOpen}"
            >
              <div class="tools_link-item_icon">
                <img :src=tool.icon alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="disclaimer"><span class="selected">*</span>Список тулзов может меняться и дополняться, мы работаем гибко
      и делаем именно то, что нужно в определенный
      момент и перестаем поддерживать то, что считаем неактуальным.
    </div>
  </div>
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      selected_tool: 1,
      tools: [
        {
          title: 'ETH CLI Minter',
          icon: require('../../assets/images/index/tools/eth.svg'),
          image: require('../../assets/images/index/tools/etn_exampl.png'),
          name: 'ЕTH CLI Minter',
          description: 'программное обеспечение для автоматизации процесса покупки NFT в сети Ethereum. Позволяет значительно упростить и ускорить приобретение картинок. В минтере доступны функции покупки через контракт, есть поддержка пабликов и WL с signature и merkle, поддержка Flipstate, безопасный режим, QuickTask а также инструменты для управления кошельками и транзакциями.',
          isOpen: false
        },
        {
          title: 'Discord in-built tools',
          icon: require('../../assets/images/index/tools/discord.svg'),
          image: require('../../assets/images/index/tools/joiner.png'),
          name: 'Discord web tools',
          description: 'на нашем Discord сервере вы найдете множество встроенных полезных инструментов. \n' +
            'Оповещения о популярных минтах, деплое и верифае контрактов, трекер действий дегенов и инфлюенсеров с NFT и щиткоинами. \n' +
            'Простой и удобный в использовании ETH & SOL Profit/Loss калькулятор, который позволяет подключить множество кошельков и считать ваш профит с определенного NFT-дропа с учетом цены покупки, комиссий и роялтию.\n' +
            'Калькулятор газа, а также монитор деплоя новых контрактов в сети ETH.\n',
          isOpen: true
        },
        {
          title: 'Retrodrop sybil tools',
          icon: require('../../assets/images/index/tools/retrodrop.svg'),
          image: require('../../assets/images/index/tools/retrodrop_ex.png'),
          name: 'Retrodrop sybil tools',
          description: 'набор CLI инструментов, который значительно упростит мультиаккинг ретродропов Layer Zero, Zksync, Starknet, Linea и прочих. Автоматический сбор и рассылка токенов, бридж и взаимодействие с контрактами, список функционала постоянно пополняется и обновляется. Мы всегда делаем то что вам нужно в тот момент когда это вам нужно. ',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    select_tool(index) {
      this.selected_tool = index
      this.tools.forEach((item) => {
        item.isOpen = false
      })
      this.tools[index].isOpen = true
    }
  }
}
</script>

<style scoped>
.tools_section {
  display: flex;
  width: 1298px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
}

.tools_section-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin-bottom: 40px;
}

.tools_section-title-item:first-child {
  margin-bottom: 20px;
  text-align: center;
}

.tools_section-title-item:last-child {
  width: 80%;
}

.text_desc {
  text-align: center;
}

.desc_element {
  width: 605px;
  height: 160px;
}

.tools_exs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1298px;
}

.tools_exs-item:first-child {
  /*width: 45%/*/
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.tools_exs-item:last-child{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image_joiner {
  width: 650px;
  height: 363px;
}


.tools_link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;
}

.tools_link-item {
  margin: 0 40px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tools_link-item:last-child {
  margin: 0;
}

.tools_link-item_header {
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 6px;
  width: 100px;
}

.tools_link-item_btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #0D121A;
  border-radius: 5px;
  padding: 17px;
  width: 91px;
  height: 91px;
  box-shadow: 0 7px rgba(21, 28, 40, 1);
}

.tools_link-item_btn:hover {
  background: rgba(21, 28, 40, 1);
}

.tools_link-item_btn:active {
  box-shadow: 0 2px rgba(170, 26, 23, 1);
  transform: translateY(5px);
}

.tools_link_item_btn {
  box-shadow: 0 7px rgba(170, 26, 23, 1);
}

.disclaimer {
  color: rgba(114, 122, 132, 1);
  font-size: 12px;
  line-height: 20px;
  margin-top: 50px;
  width: 60%;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
}

.add_marg {
  margin-left: 10px;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

@media screen and (max-width: 1000px) {
  .tools_exs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%
  }

  .tools_exs-item {
    width: 100%;
    flex-wrap: wrap;
  }

  .tools_exs-item:nth-child(2) {
    width: 100%;
  }

  .image_joiner {
    width: 100%;
    margin-bottom: 50px;
  }
}
</style>
