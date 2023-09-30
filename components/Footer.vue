<template>
  <div class="footer">
    <div class="container footer__container">
      <div v-if="screenWidth < 850"
        class="footer__content"
      >
        <img src="../assets/images/footer/footer_logo.svg" alt="" class="logo_footer">
        <div class="footer__socials">
          <a v-for="(social, index) of links" :key="index" class="social__link" :href="social.href" target="_blank">
            <img :src="social.logotype" alt="">
          </a>
        </div>
        <div class="footer__info">
          © :root. All rights reserved
        </div>
      </div>
      <div v-else>
        <div v-if="window.innerWidth < 850"
             class="footer__content"
        >
          <div class="footer__socials">
            <a v-for="(social, index) of links" :key="index" class="social__link" :href="social.href" target="_blank">
              <img :src="social.logotype" alt="">
            </a>
          </div>
          <div>
            <br>
          </div>
          <div class="footer__info">
            © :root. All rights reserved
          </div>
        </div>
      </div>
      <div class="footer__navigation">
        <div>
          <NuxtLink v-scroll-to="'#top'" to="/" class="nav-item">
            Домой
          </NuxtLink>
          <NuxtLink v-scroll-to="'#features'" to="/" class="nav-item">
            Преимущества
          </NuxtLink>
          <NuxtLink v-scroll-to="'#soft'" to="/" class="nav-item">
            Софт
          </NuxtLink>
          <NuxtLink v-scroll-to="'#faq'" to="/" class="nav-item">
            FAQ
          </NuxtLink>
          <nuxt-link to="/terms" class="nav-item">
            Пользовательское соглашение
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data () {
    return {
      links: [
        {
          href: 'https://discord.gg/a4GN6xY9kq',
          logotype: require('@/assets/images/footer/discord.svg')
        },
        {
          href: 'https://twitter.com/cmd_crypto',
          logotype: require('@/assets/images/footer/twitter.svg')
        },
        {
          href: 'https://t.me/cmd_crypto',
          logotype: require('@/assets/images/footer/telegram.svg')
        },
        {
          href: 'https://vk.com/cmd_crypto',
          logotype: require('@/assets/images/footer/vk.svg')
        }
      ]
    }
  },
  computed: {
    ...mapGetters('checkingScreen', ['screenWidth'])
  },
  mounted() {
    this.checkingScreen()
  },
  methods: {
    ...mapActions('checkingScreen', ['checkingScreen'])
   }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/variables.scss";
.footer {
  background-color: $surface2;
  z-index: 20;
}
.footer__container {
  display: flex;
  flex-direction: column;
}
.footer__content {
  display: flex;
  align-items: center;
  padding: 64px;
  border-bottom: 1px solid $surface3;
}
.footer__socials {
  display: flex;
  margin-left: 100px;
  align-items: center;
}
.social__link {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(170, 26, 23, 0.5);
  border: 1px solid #AA1A17;

  &:hover {
    background-color: rgba(170, 26, 23, 1);
  }
  &:active {
    background-color: rgba(170, 26, 23, 1);
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
}
.footer__info {
  flex-grow: 1;
  text-align: right;
  color: #727A84;
}

.footer__navigation {
  display: flex;
  margin-top: 56px;
  margin-bottom: 241px;
  padding: 0 64px;
}

.nav-item {
  color: $white;
  text-decoration: underline;
  cursor: pointer;
  font-size: 15px;
  line-height: 23px;

  &:not(:last-child) {
    margin-right: 32px;
  }
}

@media screen and (max-width: 850px){
  .logo_footer{
    display: none;
  }
  .footer__socials {
    width: 100%;
    margin: 0;
    padding: 0 0 20px;
    border-bottom: 1px solid $surface3;
  }
  .footer__content{
    padding: 60px 10px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .footer__navigation{
    display: none;
  }
  .footer__info{
    padding: 20px 0 ;
  }
}
</style>
