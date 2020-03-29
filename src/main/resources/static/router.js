import Vue from './libs/vue.esm.browser.js'
import VueRouter from './libs/vue-router.esm.browser.js'
import { store } from './store.js'

Vue.use(VueRouter)


import home from './views/home.js'
import login from './views/login.js'
import register from './views/register.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
      {
        name:"login",
        path: '/login',
        component: login,
        async beforeEnter(to, from, next){
          try{
            const tokenFromStorage = JSON.parse(localStorage.getItem('accessToken'))
            const us = tokenFromStorage.user
            
            next('/')
          } catch(e){
            next()
          }
        }
      },
      {
        name:"entryPoint",
        path: '/',
        component: home,
        async beforeEnter(to, from, next){
          checkToken(to, from, next)
        }
      },
      {
     name:"register",
     path: '/register',
     component: register
     }
      
  ]
});

async function checkToken(to, from, next){
  try{
    const tokenFromStorage = JSON.parse(localStorage.getItem('accessToken'))
    const us = tokenFromStorage.user.username

    const userAndToken = {
      user: tokenFromStorage.user,
      token: tokenFromStorage.token
    }

    const bearer = 'Bearer ' + userAndToken.token

    let result

    try{
      result = await fetch('/rest/auth/checkToken', {
        headers: {
          'Authorization': bearer
        }
      })
    } catch(e){
      console.log(e)
    }

    console.log(result.ok)
    
    if (result.ok){
      
      store.commit('saveAccessToken', userAndToken)
      let currentUser = await fetch('/rest/users/' + store.state.userAndToken.user.id)
      currentUser = await currentUser.json()
      store.commit('loginUser', currentUser)
      store.commit('setCurrentChannel', 1)
      next()
    } else {
      localStorage.removeItem('accessToken')
      next('/login')
    } 
  } catch (e){
    next('/login')
  }
  
}