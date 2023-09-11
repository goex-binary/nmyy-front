/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const myreg =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function validPhone(str) {
  const myreg = /^1[3456789]\d{9}$/;
  console.log(str, myreg.test(str), "myreg.test(str)");
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
export function isValidJSONObjectOrArray(str) {
  try {
    const data = JSON.parse(str);
    return typeof data === "object" && data !== null; // 验证其为非null的对象（因为 `typeof null` 也是 'object'）
  } catch (e) {
    return false;
  }
}
