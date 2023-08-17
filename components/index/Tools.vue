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
        <img :src="tools[selected_tool].image" alt="" class="image_joiner">
      </div>
      <div class="tools_exs-item">
        <div class="text_desc">
          <span class="selected">{{ tools[selected_tool].name }}</span> {{ tools[selected_tool].description }}
        </div>
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
    <div class="disclaimer"><span class="selected">*</span>Список тулзов может меняться и дополняться, мы работаем гибко и делаем именно то, что нужно в определенный
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
          title: 'ЕTH CLI Minter',
          icon: require('../../assets/images/index/tools/eth.svg'),
          image: require('../../assets/images/index/tools/etn_exampl.svg'),
          name: 'ЕTH CLI Minter',
          description: 'программное обеспечение для автоматизации процесса покупки NFT в сети Ethereum. Позволяет значительно упростить и ускорить приобретение картинок. В минтере доступны функции покупки через контракт, есть поддержка пабликов и WL с signature и merkle, поддержка Flipstate, безопасный режим, QuickTask а также инструменты для управления кошельками и транзакциями.',
          isOpen: false
        },
        {
          title: 'Built-in Discord tools',
          icon: require('../../assets/images/index/tools/discord.svg'),
          image: require('../../assets/images/index/tools/joiner.svg'),
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
          image: require('../../assets/images/index/tools/retrodrop_ex.svg'),
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
  width: 100%;
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

.tools_exs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tools_exs-item:first-child {
  width: 45%;
}

.tools_exs-item:nth-child(2) {
  width: 53%;
}

.image_joiner {
  width: 100%;
}

.tools_link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
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
  margin-bottom: 10px;
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
  width: 10vh;
  height: 10vh;
  box-shadow: 6px 6px 0 1px rgba(21, 28, 40, 1);
}

.tools_link_item_btn {
  box-shadow: 6px 6px 0 1px rgba(170, 26, 23, 1);
}
.disclaimer{
  color: rgba(114, 122, 132, 1);
  font-size: 12px;
  line-height: 20px;
  margin-top: 50px;
  width: 60%;
  text-align: center;
}
.add_marg {
  margin-left: 10px;
}

@media screen and (max-width: 1500px) {
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
