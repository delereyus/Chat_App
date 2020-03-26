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
            
            next('/home')
          } catch(e){
            next()
          }
        }
      },
      {
        name:"home",
        path: '/home',
        component: home,
        async beforeEnter(to, from, next) {
          checkToken(to, from, next)
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
        name:"entryPoint2",
        path: '',
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
    const us = tokenFromStorage.user

    const userAndToken = {
      user: tokenFromStorage.user,
      token: tokenFromStorage.token
    }
    store.commit('saveAccessToken', userAndToken)

    const bearer = 'Bearer ' + store.state.userAndToken.token

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

    let currentUser = await fetch('/rest/users/' + store.state.userAndToken.user.id)
    currentUser = await currentUser.json()
    
    store.commit('loginUser', currentUser)
    store.commit('setCurrentChannel', 1)

    if (result.ok){
      next()
    }
  } catch (e){
    next('/login')
  }
  
}