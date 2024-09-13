import service from './common'
import store from 'store'
import API_LIST from '@/config/api.config'
import base from '@/config/base.config'
import encryptUtil from '@/util/encrypt'

const { encrypt, getPublicKey } = encryptUtil
const { TOKEN_NAME } = base
export default async function Http({ type, data }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, noMessage = false, rsaKey = false, rest = false, setToken = false } = API_LIST[type]
  try {
    if (rest) {
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    if (rsaKey && data[rsaKey]) {
      let publicKey = await getPublicKey()
      data[rsaKey] = encrypt(publicKey, data[rsaKey])
    }
    data = method.toLowerCase() === 'get' ? { params: data } : data
    let result = await service[method.toLowerCase()](url, data)

    if (setToken) {
      let token = result.token;
      let userId = result?.userId
      store.set(TOKEN_NAME, token)
      store.set('uid', userId)

      this.$store.dispatch('login')
    }
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      if (!noMessage) {
        this.$notify.error({
          title: '错误',
          message
        })
      }
    }
    return Promise.reject(error);
  }
}
