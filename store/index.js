export const state = () => ({
  cart: []
})
export const getters = {
  getCart: (state) => {
    return state.cart
  }
}

export const mutations = {
  addToCart (state, product) {
    state.cart.push(product)
  }
}
