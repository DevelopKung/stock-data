import routeAPI from './router'

export const state = () => ({
  lists: [],
  activeIndex: null,
  activeMenu: {},
  menu: []
})

export const getters = {
  lists: (state) => { return state.lists },
  activeIndex: (state) => { return state.activeIndex },
  activeMenu: (state) => { return state.activeMenu },
  menu: (state) => { return state.menu },
}

export const mutations = {
  setData(state, data) { state.lists = data },
  setActiveIndex(state, data) { state.activeIndex = data },
  setActiveMenu(state, data) { state.activeMenu = data },
  setMenu(state, data) { state.menu = data },
}

export const actions = {
  clearData({ commit, dispatch }) {
    commit('setData', [])
    dispatch('clearActive')
  },
  clearActive({ commit }) {
    commit('setActiveIndex', null)
    commit('setActiveMenu', null)
  },

  async listMenu({ state, commit }, reload) {
    if (state.menu.length == 0 || reload == 'reload') {
      const url = routeAPI.me.menu;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      config.params = { show_all: 'y' }
      const res = await this.$axios.$get(url, config);
      commit('setMenu', res.data)
      return res.data
    }
  },

  async validateRole({ commit, state, dispatch }, menu_code) {
    await dispatch('loadData')
    const index = state.lists.findIndex(x => (x.menu_code && menu_code == x.menu_code))
    const menu = state.lists.filter(x => x.menu_type == 'menu').find(x => (x.menu_code && menu_code == x.menu_code))

    commit('setActiveIndex', index)
    commit('setActiveMenu', menu)
    return (index >= 0)
  },

  async loadData({ state, commit, dispatch }, reload) {
    await dispatch('listMenu', reload)
    commit('setData', state.menu)
  },
}