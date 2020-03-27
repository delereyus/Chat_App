import userDetails from './userDetails.js'
export default{
  components:{
    userDetails
  },
  template:`
    <div class="friendList">
      <h3>Friends:</h3>
        <ul>
          <li v-for="friend in friendList" 
              :key="friend.id"
              @click="goToFriendDetails(friend)"
              >
            <h4>User: {{ friend.username }}</h4>          
          </li>
        </ul>
        <div v-if="showModal" class="modal-route">
              <div class="modal-content"> 
                <userDetails :friend="activeFriend"/>
               </div>
        </div>
    </div>
  `,

  data(){
    return{
      showModal: false,
      activeFriend: null
    }
  },
  methods:{
    goToFriendDetails(friend){
     this.activeFriend = friend
     console.log('-----Active friend----')
     console.log(this.activeFriend)
      this.showModal = true
    },
    close() {
      this.showModal = false;
    }
  },

  computed:{
    friendList(){
      return this.$store.state.friendShips
    },
  }
}