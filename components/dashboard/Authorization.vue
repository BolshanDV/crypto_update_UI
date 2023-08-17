<template>
  <div class="authorization">
    <div class="authorization_content">
      <div class="input_title">
        Лицензионный ключ
      </div>
      <div class="authorization_section">
        <input
          v-model="licenseKey"
          class="input"
          placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
        />
        <button
          class="authorization_button"
          @click="bindLicense()"
          :class="{button_active: licenseKey.length >= 20}"
        >
          <span v-if="!isLoading">
            Активировать
          </span>
          <span v-else>
            <spinner/>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/UIComponents/Spinner.vue";
import axios from "axios";

export default {
  components: {Spinner},
  data() {
    return {
      licenseKey: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async bindLicense() {
      if (this.licenseKey.length >= 20) {
        this.isLoading = true
        const cleanLicenseKey = this.licenseKey.replace(/-/g, '').substring(0, 20).toUpperCase()
        await axios
          .post(`${process.env.USER_DETAILS_URL}/api/user/licence/bind`,
            { licence: cleanLicenseKey },
            { withCredentials: true }
          )
          .then(res => {
            if (res.status === 200) {
              document.location.href = process.env.USER_DETAILS_URL + '/api/user/oauth2/authorization/discord'
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
}
</script>

<style scoped>
.authorization {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.authorization_content {
  background: #0D121A;
  border-radius: 9px;
  padding: 20px;
  width: 35%;
  min-width: 400px;
}

.authorization_section {
  display: flex;
  flex-direction: row;
}

.input {
  background: #161E29;
}

.input_title {
  color: #727A84;
  margin-bottom: 10px;
}

.authorization_button {
  background: #161E29;
  border-radius: 8px;
  border: none;
  color: #727A84;
  padding: 0 20px;
  margin-left: 15px;
}
.button_active{
  background: #AA1A17;
  color: #FFFFFF;
}
@media screen and ( width < 500px) {
  .authorization_content {
    width: 85%;
    min-width: auto;
  }
  .authorization_section{
    flex-direction: column;
  }
  .authorization_button{
    margin-left: 0;
    margin-top: 15px;
    padding: 10px 20px;

  }
}
</style>
