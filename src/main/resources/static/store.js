import Vue from './libs/vue.esm.browser.js'
import Vuex from './libs/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
       users: [],
       userChannels: [],
       channels: [],
       friendShips: [],
       messages: [],
       onlineUsers: [],
       currentUser: {},
       currentChannel: {},
       userAndToken: {}
    },
    mutations: {
      saveAccessToken(state, userAndToken){
        localStorage.setItem('accessToken', JSON.stringify(userAndToken))
        state.userAndToken = userAndToken
        console.log(state.userAndToken)
      },
      
      displayUsers(state, users){
        state.users = users;
      },

      loadOnlineUsers(state, users){
        state.onlineUsers = users
      },

      displayChannels(state, channels){
        state.channels = channels;
      },

      displayFriendship(state, friendShips){
        state.friendShips = friendShips;
        console.log(friendShips)
        
      },
      loginUser(state, user){
        state.currentUser = user
      },

      goOnline(state, user){
        state.onlineUsers.push(user)
        for (let use of store.state.users){
          if (use.id === user.id){
            use.online = true
          }
        }
        console.log(state.onlineUsers)
      },

      goOffline(state, index){
        state.onlineUsers.splice(index, 1)
      },

      displayMessages(state, messages){
        for (let i = 0; i < messages.length; i++){
          messages[i].message_time = new Date(messages[i].message_time).toLocaleString()
        }
        state.messages = messages
      },

      displayUserChannels(state, userChannels){
        state.userChannels = userChannels
      },

      addUserChannel(state, userChannel){
        
      },
      sendMessage(state, message){
        console.log(message)
        message.message_time = new Date(message.message_time).toLocaleString()
        state.messages.push(message)
        console.log(state.messages)
      },

      appendChannel(state, channel){
        state.channels.push(channel)
      },

      deleteFriend(state, index){
        console.log(index)
        console.log(state.friendList)
        state.friendList.splice(index, 1)
      },

      setCurrentChannel(state, channelId){
        state.currentChannel = channelId
        console.log(state.currentChannel)
      },

       appendUser(state, user){
       state.users.push(user)
      },
      
      deleteMessage(state, index){
        state.messages.splice(index, 1)
      }
    }
})