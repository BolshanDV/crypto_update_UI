
export const state = () => ({
  sidebarFlag: false
})
export const mutations = {
  changeSidebarFlag(state) {
    state.sidebarFlag = !state.sidebarFlag
  }
}

export const actions = {
  changeSidebarFlag(ctx) {
    ctx.commit('changeSidebarFlag')
  }
}

export const getters = {
  sidebarFlag: state => state.sidebarFlag
}
