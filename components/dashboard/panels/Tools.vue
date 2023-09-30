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
            :class="{not_available: !soft.active}"
          >
            {{ soft.tool.longName }}
          </div>
          <div class="tools_param">
        <span>
          <img src="../../../assets/images/dashboard/key.svg" alt="">
        </span>
            <span class="tools_text">
          Лицензионный ключ:
        </span>
            <span class="tools_value copy_section"
                  :class="{not_available: !soft.active}"
            >
          {{ soft.authToken }}
        </span>

            <span
              v-if="soft.active"
              class="copy button_section"
              @click="copy(soft.authToken)"
            >
             <svg :class="{active: copyFlag === soft.authToken}"
                  width="15" height="15" viewBox="0 0 15 15" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
      <path :class="{active: copyFlag === soft.authToken}"
            d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
            stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path :class="{active: copyFlag === soft.authToken}"
            d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z"
            stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path :class="{active: copyFlag === soft.authToken}" d="M7.23975 1H9.83975" stroke="white" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path :class="{active: copyFlag === soft.authToken}" d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path :class="{active: copyFlag === soft.authToken}"
            d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501"
            stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path :class="{active: copyFlag === soft.authToken}"
            d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z"
            stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
            </span>
            <span
              v-else
              class="copy button_section"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.75 8.40995V10.36C10.75 12.96 9.71 14 7.11 14H4.64C2.04 14 1 12.96 1 10.36V7.88995C1 5.28995 2.04 4.24995 4.64 4.24995H6.59"
    stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.7496 8.40995H8.6696C7.1096 8.40995 6.5896 7.88995 6.5896 6.32995V4.24995L10.7496 8.40995Z" stroke="white"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.23975 1H9.83975" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.25 2.95C4.25 1.871 5.121 1 6.2 1H7.903" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.9996 4.90007V8.92357C13.9996 9.93107 13.1806 10.7501 12.1731 10.7501" stroke="white"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.9999 4.9H12.0499C10.5874 4.9 10.0999 4.4125 10.0999 2.95V1L13.9999 4.9Z" stroke="white"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </span>
          </div>
          <div class="tools_param function_item"
               v-if="soft.active"
          >
            <div class="function_item"
                 @click="download(soft.tool.documentation)"
            >
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/doc.svg" alt="">
              </div>
              <div class="tools_text">
                Документация
              </div>
            </div>
            <div
              class="function_item"
              @click="download(soft.tool.windowsResource)"
            >
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/download.svg" alt="">
              </div>
              <div class="tools_text">
                Скачать
              </div>
            </div>
          </div>
          <div class="tools_param function_item"
               v-else
          >
            <div class="function_item">
              <div class="svg_element">
                <img src="../../../assets/images/dashboard/doc.svg" alt="">
              </div>
              <div class="tools_text">
                Документация
              </div>
            </div>
            <div class="function_item">
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
              <div class="svg_element svg_margin">
                <img src="../../../assets/images/dashboard/untie.svg" alt="">
              </div>
              <div class="tools_text">
            <span
              class="fail"
            >
              Отвязать ключ
            </span>
              </div>
            </div>
          </div>
        </div>
        <div class="images_tools">
          <!--          <img src="../../../assets/images/dashboard/ETH_minter_cli.svg" alt="">-->
          <img :src="soft.tool.logotype" alt="" class="">
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
    ...mapGetters('authorizationHandler', ['user_details']),
    ...mapGetters('checkingScreen', ['copyFlag'])
  },

  methods: {
    ...mapActions('authorizationHandler', ['GET_USER_DETAILS']),
    ...mapActions('checkingScreen', ['changeCopyFlag']),
    async copy(token) {
      try {
        if (navigator.clipboard) {
          await this.changeCopyFlag(token)
          await navigator.clipboard.writeText(token);

          setTimeout(() => {
            this.changeCopyFlag(false)
          }, 150);
        }
      } catch (err) {
        console.error(`Failed to copy: ${err}`);
      }

    },
    download(href) {
      document.location.href = href
    },
    async unbindKey(authToken) {
      console.log(authToken)
      await axios
        .post(`${process.env.USER_DETAILS_URL}/api/user/tool/unbind`,
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
  },

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
  margin-bottom: 18px;
  font-family: Montserrat, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 160% */
}

.tools_section-element {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 500px;
  scrollbar-gutter: stable
}

.tools_section-element::-webkit-scrollbar {
  width: 1px;
}

.tools_section-element::-webkit-scrollbar-thumb {
  background: #AA1A17;
  border-radius: 3px;
  width: 2px;
}

.tools_section-element::-webkit-scrollbar-track {
  background: #0D121A;
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
  margin-right: 5px;
}

.images_tools {
  margin-right: 15px;
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.copy {
  margin-bottom: 5px;
}

.not_available {
  color: rgba(114, 122, 132, 1);
}

.fail {
  color: #AA1A17;
  line-height: normal;
}

.svg_margin {
  margin-bottom: 3px;
}

.tool_png {
  object-fit: cover;
  width: 55px;
}
</style>
