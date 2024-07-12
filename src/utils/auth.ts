const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.setItem(TokenKey, '')
}

export function getUsername() {
  return localStorage.getItem('username')
}

export function setUsername(token: string) {
  return localStorage.setItem('username', token)
}

export function removeUsername() {
  return localStorage.setItem('username', '')
}

export function getRole() {
  return localStorage.getItem('role')
}

export function setRole(token: string) {
  return localStorage.setItem('role', token)
}

export function removeRole() {
  return localStorage.setItem('role', '')
}
