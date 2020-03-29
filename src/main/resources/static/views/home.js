import user from '../components/user.js'
import userChannels from '../components/channelList.js'
import friendlist from '../components/friendlist.js'
import messages from '../components/messages.js'
import messageInput from '../components/messageInput.js'
import createChannel from '../components/createChannel.js'
import onlineList from '../components/onlineList.js'
import { store } from '../store.js'


export default{
    components:{
       user,
       userChannels,
       friendlist,
       messages,
       messageInput,
       createChannel,
       onlineList,
    },

    template:`
    <div class="frontPage">
        <div class="leftBar">
          <user />
          <friendlist />
          <userChannels />
          <createChannel />
        </div>
        <div class="messagesView">
          <messages />
          <messageInput />
        </div>
        <div class="rightBar">
          <onlineList />
        </div>
    </div>
    `,

    methods:{
      async loadUsers(){
        let users = await fetch('/rest/users')
        users = await users.json()
        this.$store.commit('displayUsers', users)
        console.log('Users:')
        console.log(users)


        let onlineUsers = users.filter(user => user.online)
        console.log(onlineUsers)
          
        this.$store.commit('loadOnlineUsers', onlineUsers)
    },

      async loadMessages(){
        //Loads all messages before home view is created
          let messages = await fetch('/rest/messages')
          messages = await messages.json()
          this.$store.commit('displayMessages', messages)
          console.log('Messages:')
          console.log(messages)
      },

      async loadUserChannels(){
        //Loads only those channels, where current user is present, before home view is created
          let url = '/rest/users/channels/id/' +  this.$store.state.currentUser.id
          let userChannels = await fetch(url)
          userChannels = await userChannels.json()
          this.$store.commit('displayUserChannels', userChannels)
      },

      async loadChannels(){
        let channels = await fetch('/rest/channels')
        channels = await channels.json()
        this.$store.commit('displayChannels', channels)
      },

      async loadFriendList(){
         //Loads user friends, before home view is created
          let url = '/rest/friend-list/' + this.$store.state.currentUser.id
          let friends = await fetch(url)
          friends = await friends.json()
          let users = []
          try{
            for (let i = 0; i < friends.length; i++){
              let friendship = friends[i]
              let url = '/rest/users/' + friendship.user
              let friend = await fetch(url)
              friend = await friend.json()
              friend["friendshipTime"] = friendship.time
              console.log('-------------')
              users.push(friend)
              console.log(friend)
            }
          }catch(e){
            console.log(e)
          }
           this.$store.commit('displayFriendship', users)
           console.log('Friends:')
           console.log(users)      
      }
    },

     created(){
       /*All methods prints data to console. This is just to see if it works. */
      console.log('created')
        this.loadUsers()
        this.loadMessages()
        this.loadUserChannels()
        this.loadChannels()
        this.loadFriendList()
    }
}