import routeAPI from './router'

export const state = () => ({
  lists_group: [],
  lists_type: []
})

export const getters = {
  lists_group: (state) => state.lists_group,
  lists_type: (state) => state.lists_type,
}

export const mutations = {
  setListGroup(state, data) {
    state.lists_group = data
  },
  setListType(state, data) {
    state.lists_type = data
  },
}

export const actions = {
  async loadDataGroup({ state, commit, dispatch }) {
    try {
      if (state.lists_group && state.lists_group.length == 0) {
        const url = routeAPI.group;
        let config = { headers: { Authorization: this.$auth.getToken('local') } }
        const res = await this.$axios.$get(url, config);
        commit('setListGroup', res.payload)
      }
      return res
    } catch (error) {
      const res = error.response || error
      return res
    }
  },
  async loadDataType({ state, commit, dispatch }) {
    try {
      if (state.lists_type && state.lists_type.length == 0) {
        const url = routeAPI.type;
        let config = { headers: { Authorization: this.$auth.getToken('local') } }
        const res = await this.$axios.$get(url, config);
        commit('setListType', res.payload)
        return res
      }
    } catch (error) {
      const res = error.response || error
      return res
    }
  },
}