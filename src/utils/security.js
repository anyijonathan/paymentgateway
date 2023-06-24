const CryptoJS = require("crypto-js");

const defaultKey = process.env.REACT_APP_ENCRYPTION_KEY;
const iv = process.env.REACT_APP_ENCRYPTION_IV;

const clientIdToKey = (clientId) => {
  let clientKey = clientId.toString();
  while (clientKey.length < 24) {
    clientKey = "0" + clientKey;
  }
  return clientKey;
};

const ascii_to_hex = (str) => {
  var arr1 = [];
  for (var n = 0, l = str?.toString().length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};

export const encrypt = (value, token = defaultKey) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  let key = CryptoJS.enc.Hex.parse(ascii_to_hex(clientIdToKey(token)));

  let initialVector = CryptoJS.enc.Hex.parse(ascii_to_hex(iv));

  let encrypted = CryptoJS.AES.encrypt(value, key, {
    iv: initialVector,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keySize: 192,
  });

  let transitMessage = encrypted.toString();
  return transitMessage;
};

export const decrypt = (value, token = defaultKey) => {
  let key = CryptoJS.enc.Hex.parse(ascii_to_hex(clientIdToKey(token)));

  let initialVector = CryptoJS.enc.Hex.parse(ascii_to_hex(iv));

  let decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: initialVector,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    keySize: 192,
  });

  let transitMessage = decrypted.toString(CryptoJS.enc.Utf8);
  return transitMessage;
};
