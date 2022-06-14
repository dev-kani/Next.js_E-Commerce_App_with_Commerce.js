import Commerce from '@chec/commerce.js'

let commerce = null

function getCommerce(commercePublicKey) {
    if (commerce) {
        return commerce;
    } else {
        const publicKey = commercePublicKey || process.env.COMMERCEJS_PUBLIC_KEY
        const devEnvironment = process.env.NODE_ENV === 'development'
        if (devEnvironment && !publicKey) {
            throw Error('Commerce.js public API key not found')
        }
        commerce = new Commerce(publicKey, devEnvironment)
        return commerce
    }
}

export default getCommerce