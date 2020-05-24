import axios from 'axios'
import apiEndpoint from '../third_party_api'

export const state = () => ({
  shopInfo: {},
  restaurantList: {}
})
export const mutations = {
  setShopInfo(state, shopInfo) {
    state.shopInfo = shopInfo
  },
  setRestaurantList(state, restaurantList) {
    state.restaurantList = {
      ...state.restaurantList,
      restaurantList
    }
  },
}
export const getters = {
  getShopInfo (state) {
    return state.shopInfo
  },
  getRestaurantList (state) {
    return state.restaurantList
  },
}
export const actions = {
  apiRequest(context, reqData) {
    return new Promise((resolve, reject) => {
      const req = {}
      req.timeout = 10000
      if (apiEndpoint[reqData.api].method === 'post') {
        req.data = reqData.data
        req.method = apiEndpoint[reqData.api].method
      } else {
        req.params = reqData.params
        req.method = apiEndpoint[reqData.api].method
      }
      req.url = apiEndpoint[reqData.api].url
      axios(req).then(response => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
