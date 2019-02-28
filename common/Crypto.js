import CryptoJS from 'crypto-js';

const Crypto = {
  is: (crypt) => {
    if (crypt === undefined || crypt === null || !crypt) return false;
    if (crypt.mode === undefined || crypt.mode === null || !crypt.mode) return false;
    switch (crypt.mode) {
      case 'des-cbc':
      case 'des-ecb':
      case 'des-cfb':
        return !(
          crypt.secret === undefined || crypt.secret === null || !crypt.secret || crypt.secret.length !== 8 ||
          crypt.iv === undefined || crypt.iv === null || !crypt.iv || crypt.iv.length !== 8);
      default:
        break;
    }
    return false;
  },
  encode: (data, crypt) => {
    if (crypt === undefined || crypt === null || !crypt) return data;
    if (crypt.mode === undefined || crypt.mode === null || !crypt.mode) return data;
    const mixed = typeof crypt.mixed === 'boolean' ? crypt.mixed : true;
    let text = typeof data === 'object' ? JSON.stringify(data) : data.toString();
    switch (crypt.mode) {
      case 'des-cbc':
      case 'des-ecb':
      case 'des-cfb':
        if (crypt.secret === undefined || crypt.secret === null || !crypt.secret) return data;
        if (crypt.iv === undefined || crypt.iv === null || !crypt.iv) return data;
        if (crypt.secret.length !== 8 || crypt.iv.length !== 8) {
          console.error('secret iv length = 8');
          return data;
        }
        const secret = CryptoJS.enc.Utf8.parse(crypt.secret);
        const iv = CryptoJS.enc.Utf8.parse(crypt.iv);
        text = CryptoJS.DES.encrypt(text, secret, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        })
          .toString();
        break;
      default:
        break;
    }
    return mixed === true ? `CRYPTO|${text}` : text;
  },
  decode: (result, crypt) => {
    if (crypt === undefined || crypt === null || !crypt) return result;
    if (crypt.mode === undefined || crypt.mode === null || !crypt.mode) return result;
    let text = typeof result === 'object' ? JSON.stringify(result) : result.toString();
    switch (crypt.mode) {
      case 'des-cbc':
      case 'des-ecb':
      case 'des-cfb':
        if (crypt.secret === undefined || crypt.secret === null || !crypt.secret) return result;
        if (crypt.iv === undefined || crypt.iv === null || !crypt.iv) return result;
        if (crypt.secret.length !== 8 || crypt.iv.length !== 8) {
          console.error('secret iv length = 8');
          return result;
        }
        const secret = CryptoJS.enc.Utf8.parse(crypt.secret);
        const iv = CryptoJS.enc.Utf8.parse(crypt.iv);
        text = CryptoJS.DES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(text) }, secret, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        })
          .toString(CryptoJS.enc.Utf8);
        text = JSON.parse(text);
        console.log('decode', text);
        break;
      default:
        break;
    }
    return text;
  },
};

export default Crypto;
