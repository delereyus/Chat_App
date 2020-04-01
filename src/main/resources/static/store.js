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
    serverMessages: [],
    offlineMessages: [],
    onlineUsers: [],
    currentUser: {},
    currentChannel: {},
    userAndToken: {},
    allUserChannels: []
  },
  mutations: {
    saveAccessToken(state, userAndToken){
      state.userAndToken = userAndToken
      localStorage.setItem('accessToken', JSON.stringify(userAndToken))
    },
      
    displayUsers(state, users){
        state.users = users;
        localStorage.setItem('allUsers', JSON.stringify(users))
    },

    loadOnlineUsers(state, users){
      state.onlineUsers = users
      localStorage.setItem('onlineUsers', JSON.stringify(users))
    },

    displayChannels(state, channels){
      state.channels = channels;
      localStorage.setItem('allChannels', JSON.stringify(channels))
    },

    displayFriendship(state, friendShips){
      localStorage.setItem('allFriendShips', JSON.stringify(friendShips))
      for (let friendShip of friendShips){
        friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
      }
      state.friendShips = friendShips;        
    },
    loginUser(state, user){
      state.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },

    goOnline(state, user){
      state.onlineUsers.push(user)
      localStorage.setItem('onlineUsers', JSON.stringify(state.onlineUsers))
      for (let use of state.users){
        if (use.id === user.id){
          use.online = true
        }
      }
      localStorage.setItem('allUsers', JSON.stringify(state.users))
    },

    goOffline(state, index){
      state.onlineUsers.splice(index, 1)
      localStorage.setItem('onlineUsers', JSON.stringify(state.onlineUsers))
    },

    displayMessages(state, messages){
      state.messages = messages
      localStorage.setItem('allMessages', JSON.stringify(messages))
    },

    loadAllServerMessages(state, messages){
      state.serverMessages = messages
      localStorage.setItem('allServerMessages', JSON.stringify(messages))
    },

    loadOfflineMessages(state, messages){
      state.offlineMessages = messages
      localStorage.setItem('offlineMessages', JSON.stringify(messages))
    },

    addServerMessage(state, message){
      state.serverMessages.push(message)
      localStorage.setItem('allServerMessages', JSON.stringify(state.serverMessages))
    },

    displayUserChannels(state, userChannels){
      state.userChannels = userChannels
      localStorage.setItem('userChannels', JSON.stringify(userChannels))
    },

    sendMessage(state, message){
      state.messages.push(message)
      localStorage.setItem('allMessages', JSON.stringify(state.messages))
    },

    appendChannel(state, channel){
      state.channels.push(channel)
      localStorage.setItem('allChannels', JSON.stringify(state.channels))
    },

    deleteChannel(state, channelId){
      
      let allChnls = state.channels.filter(ch => ch.id !== channelId)
      let newUserChannels = state.userChannels.filter(usch => usch.id !== channelId)
      let allUsCh = state.allUserChannels.filter(uch => uch.channel_id !== channelId)
      let allMsg = state.messages.filter(msg => msg.channel_id !== channelId)

      state.messages = allMsg
      state.channels = allChnls
      state.userChannels = newUserChannels
      state.allUserChannels = allUsCh

      localStorage.setItem('allChannels', JSON.stringify(state.channels))
      localStorage.setItem('currentChannel', JSON.stringify(state.channels[0]))
      localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
      localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
      
      state.currentChannel = state.userChannels[0]
    },

    deleteFriend(state, index){
      state.friendShips.splice(index, 1)
      localStorage.setItem('allFriendShips', JSON.stringify(state.friendShips))
    },

    addFriend(state, friendShip){
      localStorage.setItem('allFriendShips', JSON.stringify(state.friendShips))
      friendShip.friendshipTime = new Date(friendShip.friendshipTime).toLocaleString()
      state.friendShips.push(friendShip)
    },

    setCurrentChannel(state, channel){
      state.currentChannel = channel
      localStorage.setItem('currentChannel', JSON.stringify(channel))
    },

    appendUser(state, user){
      state.users.push(user)
      localStorage.setItem('allUsers', JSON.stringify(state.users))
    },
      
    deleteMessage(state, index){
      state.messages.splice(index, 1)
      localStorage.setItem('allMessages', JSON.stringify(state.messages))
    },

    allUserChannels(state, channels){
      state.allUserChannels = channels
      localStorage.setItem('allUserChannels', JSON.stringify(channels))
    },

    deleteUserChannel(state, userChannel){
      for (let i = 0; i < state.allUserChannels.length; i++){
        if (state.allUserChannels[i].channel_id === userChannel.channel_id && state.allUserChannels[i].user_id === userChannel.user_id){
          state.allUserChannels.splice(i, 1)
          localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
        }
      }

      for (let i = 0; i < state.userChannels.length; i++){
        if (state.userChannels[i].id === userChannel.channel_id && userChannel.user_id === state.currentUser.id){
          state.userChannels.splice(i, 1)
          localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
        }
      }

      state.currentChannel = state.userChannels[0]
      localStorage.setItem('currentChannel', JSON.stringify(state.currentChannel))

    },

    addToAllChannels(state, userChannel) {
      state.allUserChannels.push(userChannel)
      localStorage.setItem('allUserChannels', JSON.stringify(state.allUserChannels))
    },
    updatePicture(state, user){
      for(let u of state.users){
        if(u.id === user.id){
          u.picture_url = user.picture_url
          if(u.id === state.currentUser.id){
            state.currentUser = u
          }
        }
      }
    },

    changeChannelName(state, channel){
      for (let chan of state.channels){
        if (chan.id === channel.id){
          console.log('true')
          chan.name = channel.name
          console.log(chan)
          console.log(channel)
        }
      }

      for (let chan of state.userChannels){
        if (chan.id === channel.id){
          console.log('true')
          chan.name = channel.name
          console.log(chan)
          console.log(channel)
        }
      }

      localStorage.setItem('allChannels', JSON.stringify(state.channels))
      localStorage.setItem('userChannels', JSON.stringify(state.userChannels))
      localStorage.setItem('currentChannel', JSON.stringify(channel))

      state.currentChannel = channel
      state.channels = JSON.parse(localStorage.getItem('allChannels'))
      state.userChannels = JSON.parse(localStorage.getItem('userChannels'))
    }
  }
})