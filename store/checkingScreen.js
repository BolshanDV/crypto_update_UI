
export const state = () => ({
  screenWidth: null,
  copyFlag: false
})
export const mutations = {
  saveWidth(state, width) {
    state.screenWidth = width
  },
  changeCopyFlag(state, flag) {
    state.copyFlag = flag
  }
}

export const actions = {
  checkingScreen(ctx) {
    let mobileScreen = window.innerWidth < 850;
    ctx.commit('saveWidth', mobileScreen)
  },
  changeCopyFlag(ctx, flag) {
    ctx.commit('changeCopyFlag', flag)
  }
}

export const getters = {
  screenWidth: state => state.screenWidth,
  copyFlag: state => state.copyFlag
}
