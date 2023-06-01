// let iv = "abcdef9876543210"

const dataHasher = {
    hash(hashword, data) {

        const ciphertext = CryptoJS.AES.encrypt(data, hashword,).toString();

        return ciphertext
    },
    unhash(hashword, data) { // {data, err}

        try {
            const decrypted = CryptoJS.AES.decrypt(data, hashword);

            if (decrypted.sigBytes < 0)
                return {err: 'hashword wrong'}

            return {data: decrypted.toString(CryptoJS.enc.Utf8)}

        } catch (err) {
            return {err}
        }

    },
    mustUnhash(hashword, data) { // string
        return dataHasher.unhash(hashword, data).data
    },
}

function test() {
    const plaintext = 'Hello, World!';
    const key = '0123456789abcdef';

    if (plaintext !== dataHasher.mustUnhash(key, dataHasher.hash(key, plaintext))) {
        throw 'hashing togri ishlamayapti'
    }
    if ('Hello, World!' !== dataHasher.mustUnhash(key, 'U2FsdGVkX19xzoKqwhPFWfdlqEq3u5cixu6mNMGVSmY=')) {
        throw 'hashing togri ishlamayapti'
    }
}


export default dataHasher
