import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getRole () {
  return Cookies.get('role')
}

export function setRole (role) {
  return Cookies.set('role', role, { expires: 7 })
}

export function removeRole () {
  return Cookies.remove('role')
}