import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import { setToken, getToken, removeToken, getUsername, setUsername, removeUsername, getRole, setRole, removeRole } from '@/utils/auth'
import router from '@/router'
import { ref } from 'vue'
interface User {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '',
    username: getUsername() || '',
    role: getRole() || 'admin'
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUsername(username: string) {
      this.username = username
    },
    setRole(role: string) {
      this.role = role
    },
    logOut() {
      this.token = ''
      this.username = ''
      this.role = ''
      removeToken()
      removeUsername()
      removeRole()
      router.push('/login')
    },
    loginHandle(user: User) {
      return new Promise((resolve, reject) => {
        login(user)
          .then((res: any) => {
            this.setToken(res.token)
            this.setUsername(res.username)
            this.setRole(res.role)
            setToken(res.token)
            setUsername(res.username)
            setRole(res.role)
            resolve(res)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    }
  },
})
