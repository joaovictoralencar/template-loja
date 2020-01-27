export const state = () => ({
  cart: []
})
export const getters = {
  getCart: (state) => {
    return state.cart
  }
}
export const actions = {
  async fetchCart ({ commit }) {
    const products = await this.$cookies.get('cart')
    commit('setCart', products)
  }
}

export const mutations = {
  addToCart (state, product) {
    state.cart.push(product)
  },
  setCart (state, cart) {
    state.cart = cart
  }
}
