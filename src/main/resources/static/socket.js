import { store } from './store.js'

    // change PORT to your backends PORT
    const ws = new WebSocket('wss://nbi-chat-app.herokuapp.com:5000/your-socket-route')
    export default ws

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data)

      switch(data.action) {
        case 'goOnline':
          store.commit('goOnline', data)
          store.commit('setCurrentChannel', 1)
          break
        case 'goOffline':
          for (let i = 0; i < store.state.onlineUsers.length; i++){
            if (store.state.onlineUsers[i].id === data.id) {
              store.commit('goOffline', i)
            }
          }
          break
        case 'new-message':
          for (let i = 0; i < store.state.userChannels.length; i++) {
            if (store.state.userChannels[i].id === data.channel_id){
              store.commit('sendMessage', data)
              break
            }
          }
          break
        case 'new-channel':
          store.commit('appendChannel', data)
          break
        case 'delete-friend':
          let friendList = store.state.friendList

          console.log(data)

          if (store.state.currentUser.id === data.user1id){
            for (let i = 0; i < friendList.length; i++){
              if (friendList[i].user === data.user2id){
                store.commit('deleteFriend', i)
              }
            }
          } else if (store.state.currentUser.id === data.user2id){
            for (let i = 0; i < friendList.length; i++){
              if (friendList[i].user === data.user1id){
                store.commit('deleteFriend', i)
              }
            }
          }
          break
        case 'delete-message':
          store.commit('deleteMessage', data.index)
          break
      }
    }

    /**
     * onopen triggas när anslutningen
     * är genomförd
     */

    /*ws.onopen = (e) => {
        sendSomething();
        isConnected = true;
    };

    ws.onclose = (e) => {
        console.log("Closing websocket...");
    };

  console.log("Connecting...");*/


export function disconnect() {
    if (ws != null) {
        ws.close();
    }
    //isConnected = false;
    console.log("Disconnected");
}

function sendSomething() {
  let socketExample = {
    message: 'Testing sockets',
    timestamp: Date.now()
  }

  let addressedMessage = {
    action: 'message',
    payload: socketExample
  }

    ws.send(JSON.stringify(socketExample));
}

function showSomething(message) {
    console.log(message);
}