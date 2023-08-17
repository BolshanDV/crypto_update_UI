<template>
  <div class="tools_section">
    <div class="tools_section_title">
      Софт
    </div>
    <div class="tools_section-element">
      <div class="between_section"
           v-for="soft in user_details.tokens"
           :key="soft.authToken"
      >
        <div>
          <div
            class="tools_element_title"
            :class="{not_available: soft.isActive}"
          >
            {{ soft.tool.macOsResource }}
          </div>
          <div class="tools_param">
        <span>
          <img src="../../../assets/images/dashboard/key.svg" alt="">
        </span>
            <span class="tools_text">
          Лицензионный ключ:
        </span>
            <span class="tools_value"
                  :class="{not_available: soft.isActive}"
            >
          {{ soft.authToken }}
        </span>
            <img
              src="../../../assets/images/dashboard/copy.svg" alt=""
              @click="copy(soft.authToken)"
              class="copy"
            >

          </div>
          <div class="tools_param function_item">
            <div class="function_item ">
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/doc.svg" alt="">
              </div>
              <div class="tools_text">
                Документация
              </div>
            </div>
            <div class="function_item"
                 @click="download(soft.tool.name)"
            >
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/download.svg" alt="">
              </div>
              <div class="tools_text">
                Скачать
              </div>
            </div>
          </div>
          <div class="tools_param"
               v-if="soft.binded"
          >
            <div class="function_item"
                 @click="unbindKey(soft.authToken)"
            >
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/untie.svg" alt="">
              </div>
              <div class="tools_text">
            <span
              class="selected"
              :class="{not_available: soft.isActive}"
            >
              Отвязать ключ
            </span>
              </div>
            </div>
          </div>
        </div>
        <div class="images_tools">
          <img src="../../../assets/images/dashboard/ETH_minter_cli.svg" alt="">
          <!--          <img :src="require(`../../../assets/images/dashboard/${soft.tool.logotype}`)" alt="">-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "axios";

export default {
  name: "Tools",
  computed: {
    ...mapGetters('authorizationHandler', ['user_details'])
  },

  methods: {
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    async copy(token) {
      if (this.soft.isActive) {
        try {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(token);
          }
        } catch (err) {
          console.error(`Failed to copy: ${err}`);
        }
      }
    },
    download(href) {
        console.log(href)
        document.location.href = href
      }
    },
    async unbindKey(authToken) {
      if (this.soft.isActive) {
        await axios
          .post(`${process.env.USER_DETAILS_URL}/api/user/licence/bind`,
            {licence: authToken},
            {withCredentials: true}
          )
          .then(res => {
            this.GET_USER_DETAILS()
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
}
</script>

<style scoped>
.tools_section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.tools_section_title {
  color: #FFFFFF;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 18px;
}

.tools_section-element {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 500px;
}

.tools_section-element::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.tools_element_title {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 15px;
}

.tools_text {
  color: #727A84;
  margin: 0 10px 0 10px;
}

.tools_value {
  color: #FFFFFF;
}

.tools_icon {
  margin: 0 10px;
}

.function_item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}

.tools_param {
  margin-bottom: 10px;
}

.tools_param:last-child {
  margin-bottom: 0;
}

.between_section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #151C28;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

.images_tools {
  margin-right: 30px;
}

.copy {
  margin-bottom: 5px;
}

.not_available {
  color: rgba(114, 122, 132, 1);
}
</style>
