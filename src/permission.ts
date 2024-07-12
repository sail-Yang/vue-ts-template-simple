import router from '@/router'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login', '/404'] // no redirect whitelist
// 路由前置守卫

router.beforeEach(async (to, _from, next) => {
  const store = useUserStore()
  const role = store.role
  // 获取token
  const token = store.token
  // 如果token存在
  if (token) {
    // 如果是登录页
    if (to.path === '/login') {
      // 跳转到首页
      next({ path: '/', replace: true, query: to.query })
    } else {
      console.log(to.meta)
      if(to.meta.roles.includes(role)){
        next()
      }else{
        next({ path: '/', replace: true, query: to.query })
      }
    }
  } else {
    // 如果是白名单
    if (whiteList.indexOf(to.path) !== -1) {
      // 正常跳转
      next()
    } else {
      // 否则跳转到登录页
      next('/login')
    }
  }
})
