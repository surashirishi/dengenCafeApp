const gurunavi = '/gurunavi/RestSearchAPI/v3'
const geo = '/geo/api/json'

export default {
  restaurantIndex: {
    url: gurunavi,
    method: 'get',
  },
  getGeoLocation: {
    url: geo,
    method: 'get',
  },
  // index: {
  //   url: endPoint + '/register',
  //   method: 'post',
  // },
}
