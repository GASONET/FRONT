import jose from 'node-jose'
import jwt from 'jsonwebtoken'
import jwktopem from 'jwk-to-pem'

export const encryptPayload = async (payload) => {
    let key = JSON.parse(localStorage.getItem('jwk'))
    key = key.keys[0]
    key.key_ops = ['encrypt', 'verify', 'wrap']
    const pubKey = await jose.JWK.asKey(key)
    await jose.JWK.createKeyStore().add(pubKey)
    JSON.stringify(pubKey.toJSON())
    const opt = { compact: true }
    const pay = JSON.stringify(payload)
    const token = await jose.JWS.createSign(opt, key).update(pay, 'utf8').final()
    return { data: token }
}

export const decryptPayload = async (payload) => {
    let key = localStorage.getItem('jwk')
    let keyStore
    keyStore = await jose.JWK.asKeyStore(key)
    const data = keyStore.toJSON()
    const [ firstKey ] = data.keys
    const publicKey = jwktopem(firstKey)
    try {
        const decoded = await jwt.verify(payload, publicKey)
        return decoded
    } catch (e) {
        throw new Error (e)
    }
}