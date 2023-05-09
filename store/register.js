import routeAPI from './router'

export const actions = {

  async register({ state, commit, dispatch }, form) {
    try {
      const url = routeAPI.register;
      const res = await this.$axios.$post(url, form);
      return res
    } catch (error) {
      console.log(routeAPI.register);
      const res = error.response || error
      return res
    }
  },

}