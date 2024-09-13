import store from 'store'
import base from '@/config/base.config'
import service from '@/api/common'
import forge from 'node-forge'
const { PUBKEY_NAME } = base


async function getPublicKey() {
  let key = store.get(PUBKEY_NAME)
  if(!key) {
    try {
      let result = await service.get(`/keys`)
      let key = result.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(PUBKEY_NAME, key)
      return key
    } catch (err) {
      console.error(err)
    }
  }
  return key
}

function encrypt(publicKey, plain) {
  const publicObj = forge.pki.publicKeyFromPem(publicKey)
  let bytes = publicObj.encrypt(plain, 'RSA-OAEP')
  return forge.util.encode64(bytes)
}

export default {getPublicKey, encrypt}