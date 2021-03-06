import Services from './services'
import axios from 'axios'

export default {
  getWechatSignature ({commit}, url) {
    return Services.getWechatSignature(url)
  },
  getUserByOAuth ({commit}, url) {
    return Services.getUserByOAuth(url)
  },
  async fetchHouses ({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data.data
    return res
  },
  async fetchCharacters ({ state }) {
    const res = await Services.fetchCharacters()
    state.characters = res.data.data
    return res
  },
  async showHouse ({ state }, _id) {
    if (_id === state.currentHouse._id) return
    const res = await Services.fetchHouse(_id)
    state.currentHouse = res.data.data
    return res
  },
  async showCharacter ({ state }, _id) {
    if (_id === state.currentCharacter._id) return
    const res = await Services.fetchCharacter(_id)
    state.currentCharacter = res.data.data
    return res
  },
  async fetchProducts ({ state }, _id) {
    const res = await Services.fetchProducts(_id)
    state.products = res.data.data
    return res
  },
  async showProduct ({ state }, _id) {
    if (_id === state.currentProduct._id) return
    const res = await Services.fetchProduct(_id)
    state.currentProduct = res.data.data
    return res
  },
  async saveProduct ({ state, dispatch }, product) {
    await axios.post('/api/products', product)
    const res = await dispatch('fetchProducts')

    return res.data.data
  },
  async putProduct ({ state, dispatch }, product) {
    await axios.put('/api/products', product)
    const res = await dispatch('fetchProducts')

    return res.data.data
  },
  async delProduct ({ state, dispatch }, product) {
    await axios.delete(`/api/products/${product._id}`)
    const res = await dispatch('fetchProducts')

    return res.data.data
  },
  async fetchUserAndOrders ({ state }) {
    const res = await Services.fetchUserAndOrders()
    state.user = res.data.data
    return res
  }
}
