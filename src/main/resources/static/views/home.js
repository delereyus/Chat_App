import user from '../components/user.js'
import userChannels from '../components/channelList.js'
import friendlist from '../components/friendlist.js'
import messages from '../components/messages.js'
import messageInput from '../components/messageInput.js'
import createChannel from '../components/createChannel.js'
import onlineList from '../components/onlineList.js'
import channelComponent from '../components/channelComponent.js'
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
       channelComponent
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
          <channelComponent />
        </div>
        <div class="rightBar">
          <onlineList />
        </div>
    </div>
    `,

    methods:{
      loadAllFromLocalStorage(){
        this.$store.commit('displayUsers', JSON.parse(localStorage.getItem('allUsers')))
        this.$store.commit('loadOnlineUsers', JSON.parse(localStorage.getItem('onlineUsers')))
        this.$store.commit('displayChannels', JSON.parse(localStorage.getItem('allChannels')))
        this.$store.commit('displayFriendship', JSON.parse(localStorage.getItem('allFriendShips')))
        this.$store.commit('displayMessages', JSON.parse(localStorage.getItem('allMessages')))
        this.$store.commit('loadAllServerMessages', JSON.parse(localStorage.getItem('allServerMessages')))
        this.$store.commit('loadOfflineMessages', JSON.parse(localStorage.getItem('offlineMessages')))
       
        if (JSON.parse(localStorage.getItem('userChannels')).length > 0){
          this.$store.commit('displayUserChannels', JSON.parse(localStorage.getItem('userChannels')))
          this.$store.commit('setCurrentChannel', JSON.parse(localStorage.getItem('currentChannel')))
        }
        
        this.$store.commit('allUserChannels', JSON.parse(localStorage.getItem('allUserChannels')))
      }
    },
    created(){
      this.loadAllFromLocalStorage()
    }
}