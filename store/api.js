import axios from 'axios'
import apiEndpoint from '../third_party_api'

// export const api = {
//   namespaced: true,
//   state: {},
//   mutations: {},
//   getters: {},
// }
export const state = () => ({
  shopInfo: {}
})
export const mutations = {
  setShopInfo(state, shopInfo) {
    state.shopInfo = shopInfo
    console.log(state.shopInfo)
  }
}
export const getters = {
  getShopInfo (state) {
    return state.shopInfo
  }
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
      req.headers = {
        // 'Access-Control-Allow-Origin': '*'
        // Authorization: localStorage.getItem('token'),
      }
      axios(req).then(response => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
