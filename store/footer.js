export const state = () => ({
  tab: 0,
})

export const getters = {
  tab: (state) => state.tab,
}

export const mutations = {
  setTab(state, data) {
    state.tab = data
  },
}

export const actions = {
  async getTab({ commit }, tab) {
    commit('setTab', tab)
  },
}