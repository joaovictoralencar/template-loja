export const state = () => ({
  all: []
})

export const actions = {
  async fetchAllProducts ({ commit }) {
    const products = await this.$axios.$get('api/products/all')
    commit('setProducts', products)
  },
  async fetchProduct ({ commit }, id) {
    const product = await this.$axios.$get(`api/products/${id}`)
    commit('setProduct', product)
  }
}

export const mutations = {
  setProduct (state, product) {
    if (state.all.length !== 0) {
      if (state.all.includes(product.product)) {
        state.all.push(product.product)
      }
    }
  },
  setProducts (state, products) {
    state.all = products.products
  }
}
