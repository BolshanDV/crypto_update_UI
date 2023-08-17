<template>
  <div class="tools_section">
    <div class="tools_section-title">
      <div class="tools_section-title-item title" id="soft-mobile">
        ЭКСКЛЮЗИВНЫЙ СОФТ
      </div>
      <div class="tools_section-title-item text_desc">
        <span class="selected">{{ tools[selected_tool].name }}</span> {{ tools[selected_tool].description }}
      </div>
    </div>
    <div class="tools_exs">
      <div class="tools_exs_position">
        <img :src="tools[selected_tool].image" alt="" class="image_joiner">
      </div>
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
          image: require('assets/images/index/toolsMobile/eth.svg'),
          name: 'ЕTH CLI Minter',
          description: 'созданы для того, чтобы упростить нашим мемберам работу с Discord аккаунтами.',
          isOpen: false
        },
        {
          title: 'Built-in Discord tools',
          icon: require('../../../assets/images/index/tools/discord.svg'),
          image: require('assets/images/index/toolsMobile/joiner.svg'),
          name: 'Discord web tools',
          description: 'созданы для того, чтобы упростить нашим мемберам работу с Discord аккаунтами.',
          isOpen: true
        },
        {
          title: 'Retrodrop sybil tools',
          icon: require('../../../assets/images/index/tools/retrodrop.svg'),
          image: require('assets/images/index/toolsMobile/joiner.svg'),
          name: 'Retrodrop sybil tools',
          description: 'созданы для того, чтобы упростить нашим мемберам работу с Discord аккаунтами.',
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

/*.tools_link-item:last-child {*/
/*  margin: 0;*/
/*  width: 100%;*/
/*}*/

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
  box-shadow: 4px 4px 0 1px rgba(21, 28, 40, 1);
}

.tools_link_item_active {
  box-shadow: 4px 4px 0 1px rgba(170, 26, 23, 1);
}

.tools_exs_position {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
}
</style>
