// let iv = "abcdef9876543210"

const dataHasher = {
    hash(hashword, data) {

        const ciphertext = CryptoJS.AES.encrypt(data, hashword,).toString();

        return ciphertext
    },
    unhash(hashword, data) {

        const decrypted = CryptoJS.AES.decrypt(data, hashword).toString(CryptoJS.enc.Utf8);

        return decrypted
    },
}

function test() {
    const plaintext = 'Hello, World!';
    const key = '0123456789abcdef';

    if (plaintext !== dataHasher.unhash(key, dataHasher.hash(key, plaintext))) {
        throw 'hashing togri ishlamayapti'
    }
    if ('Hello, World!' !== dataHasher.unhash(key, 'U2FsdGVkX19xzoKqwhPFWfdlqEq3u5cixu6mNMGVSmY=')) {
        throw 'hashing togri ishlamayapti'
    }
}


export default dataHasher
