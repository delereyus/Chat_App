import user from "./user.js"
import userDetails from './userDetails.js'


export default {
    components: {
    user,
    userDetails
    },
    template: `
        <div class="onlineList" v-if="hasJoinedChannels()">
            <h2>Users</h2>
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in online"  
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)"
                    @click="goToUserDetails(user)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>
                <h3>Offline:</h3>
                <ul>
                    <li v-for="user in offline" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id && checkUserChannel(user.id)"
                    @click="goToUserDetails(user)">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>          
                    <div v-if="showModal" class="modal-route">
                      <div class="modal-content"> 
                        <userDetails :user="clickedUser"/>
                      </div>
                    </div>
        </div>
    `,

computed: {
    users(){
      return this.$store.state.users
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    online(){
      return this.$store.state.onlineUsers 
    },
    offline(){
      return this.users.filter(user => user.online === false)
    },
    channel(){
      return this.$store.state.currentChannel
    },
    userChannels() {
      return this.$store.state.allUserChannels
    },
    myChannels(){
      return this.$store.state.userChannels
    }
  },
  data(){
    return{
      clickedUser: null,
      showModal: false
    }
  },
  methods: {
    hasJoinedChannels(){
      if (this.myChannels.length > 0){
        return true
      } else return false
    },
    checkUserChannel(userId) {
      let isUserInChannel = false
      for (let userChannel of this.userChannels) {
        if(userChannel.channel_id === this.channel.id && userChannel.user_id === userId) {
          isUserInChannel = true
          break
        }
      }
      return isUserInChannel
    },
    goToUserDetails(user){
      if(user.id === this.currentUser.id) return
      this.clickedUser = user
      this.showModal = true
     },
    close() {
       this.showModal = false;
     }
  }
}