export const formatAddress = (address) => {
  if (address.length < 24) {
    return address;
  } else {
    return address.slice(0, 24) + "..";
  }
};

export const numberWithCommas = (number) => {
  if (typeof number === "string") {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const calculateSessionTime = (tokenExpirationTime) => {
  if (tokenExpirationTime) {
    const convertedExpiryDate = new Date(tokenExpirationTime).getTime();
    const currentDate = new Date().getTime();
    const remainingDuration = convertedExpiryDate - currentDate;

    return remainingDuration;
  }
  return null;
};

export const generateRequestId = () => {
  const newId = (
    Date.now().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 10)
  ).toUpperCase();

  return newId;
};

const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    let ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

export const downloadFile = (data, type, name) => {
  const byte = base64ToArrayBuffer(data);
  const blob = new Blob([byte], { type: type });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  const fileName = name;
  link.download = fileName;
  link.click();
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length;
};

export const formatDate = (dateString) => {
  if (dateString) {
    const newDate = new Date(dateString);
    const datetime =
      newDate.getDate() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getFullYear() +
      " | " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes() +
      ":" +
      newDate.getSeconds();

    return datetime;
  }
  return "date not found";
};

export const shortenText = (text, length = 40) => {
  let myTruncatedString = text;
  if (myTruncatedString.length > length) {
    myTruncatedString = text.substring(0, length - 3) + "...";
  }
  return myTruncatedString;
};

export const uniqueArray = (arr) =>
  arr?.length > 0
    ? arr?.filter(
        (object, index) =>
          index === arr?.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(object))
      )
    : [];
