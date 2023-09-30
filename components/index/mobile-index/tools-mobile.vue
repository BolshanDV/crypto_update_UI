<template>
  <div class="tools_section">
    <div class="tools_section-title">
      <div class="tools_section-title-item title" id="soft-mobile">
        ЭКСКЛЮЗИВНЫЙ СОФТ
      </div>
      <transition name="mode-fade" mode="out-in">
      <div class="tools_section-title-item text_desc">
        <span class="selected">{{ tools[selected_tool].name }}</span> {{ tools[selected_tool].description }}
      </div>
      </transition>
    </div>
    <div class="tools_exs">
      <transition name="mode-fade" mode="out-in">
      <div class="tools_exs_position">
        <img :src="tools[selected_tool].image" alt="" class="image_joiner">
      </div>
      </transition>
      <div class="tools_exs">
        <div class="tools_link">
          <div
            class="tools_link-item"
            v-for="(tool, index) in tools"
            :key="index"
            @click="select_tool(index)"
          >
            <div
              class="tools_link-item_btn"
              :class="{tools_link_item_active: tool.isOpen}"
            >
              <img :src=tool.icon alt="" class="tool_icon">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tools-mobile",
  data() {
    return {
      selected_tool: 1,
      tools: [
        {
          title: 'ЕTH CLI Minter',
          icon: require('../../../assets/images/index/tools/eth.svg'),
          image: require('assets/images/index/toolsMobile/eth.png'),
          name: 'ЕTH CLI Minter',
          description: 'программное обеспечение для автоматизации процесса покупки NFT в сети Ethereum. Позволяет значительно упростить и ускорить приобретение картинок. В минтере доступны функции покупки через контракт, есть поддержка пабликов и WL с signature и merkle, поддержка Flipstate, безопасный режим, QuickTask а также инструменты для управления кошельками и транзакциями.',
          isOpen: false
        },
        {
          title: 'Built-in Discord tools',
          icon: require('../../../assets/images/index/tools/discord.svg'),
          image: require('assets/images/index/toolsMobile/joiner.png'),
          name: 'Discord web tools',
          description: 'на нашем Discord сервере вы найдете множество встроенных полезных инструментов. \n' +
            'Оповещения о популярных минтах, деплое и верифае контрактов, трекер действий дегенов и инфлюенсеров с NFT и щиткоинами. \n' +
            'Простой и удобный в использовании ETH & SOL Profit/Loss калькулятор, который позволяет подключить множество кошельков и считать ваш профит с определенного NFT-дропа с учетом цены покупки, комиссий и роялтию.\n' +
            'Калькулятор газа, а также монитор деплоя новых контрактов в сети ETH.\n',
          isOpen: true
        },
        {
          title: 'Retrodrop sybil tools',
          icon: require('../../../assets/images/index/tools/retrodrop.svg'),
          image: require('assets/images/index/toolsMobile/retrodrop.png'),
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
  z-index: 10;
}

.tools_section-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 100vw;
}

.tools_section-title-item:first-child {
  margin-bottom: 40px;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
}

.tools_section-title-item:last-child {
  width: 90%;
  text-align: left;
}

.text_desc {
  text-align: center;
  height: 280px;
}

.tools_exs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}

.image_joiner {
  width: 90vw;
}

.tools_link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  width: 100%;
}

.tool_icon {
  width: 80%;
  height: 80%;
}

.tools_link-item {
  margin: 0 20px 0 0;
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
}

.tools_link-item_btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #0D121A;
  border-radius: 5px;
  padding: 5px;
  width: 52px;
  height: 52px;
  box-shadow: 0 7px rgba(21, 28, 40, 1);
  transition: all .5s ease 0s;
}
.tools_link-item_btn:active{
  box-shadow: 0 2px rgba(170, 26, 23, 1);
  transform: translateY(5px);
}
.tools_link_item_active {
  box-shadow: 0 7px rgba(170, 26, 23, 1);
}

.tools_exs_position {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
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
</style>
