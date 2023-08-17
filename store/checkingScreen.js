
export const state = () => ({
  screenWidth: null
})
export const mutations = {
  saveWidth(state, width) {
    state.screenWidth = width
  }
}

export const actions = {
  checkingScreen(ctx) {
    let mobileScreen = window.innerWidth < 850;
    ctx.commit('saveWidth', mobileScreen)
  }
}

export const getters = {
  screenWidth: state => state.screenWidth
}
