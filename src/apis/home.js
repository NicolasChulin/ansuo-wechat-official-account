import api from './api'

export default {
  list (datas, success, error) {
    api._post('', datas, success, error)
  },
  // wiexin
  wxAccessToken (datas, success, error) {
    api._post('/weixin/getOAuth2AccessToken', datas, success, error)
  },
  getJsApiParameter (datas, success, error) {
    api._post('/weixin/getJsApiParameter', datas, success, error)
  }
}
