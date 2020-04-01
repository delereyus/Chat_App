export default {
  template: `
    <div class="modal"> 
      <div class="close-x">
        <button @click="close">Close</button>
      </div>
      <h2>{{ details.username }}</h2>
      <img :src="details.picture_url" 
            alt="User Image" 
            width="80" 
            height="80">

      <p v-if="details.friendshipTime">Friend Since: {{ details.friendshipTime }}</p>
      <button v-if="details.friendshipTime && !loggedInUser" 
              @click="removeFriend(details.id)">Remove Friend</button>

      <button v-if="!details.friendshipTime && !loggedInUser"
              @click="addFriend(details.id)">Add As a Friend</button>

      <button v-if="loggedInUser" @click="logOut">Log Out</button>

      <form v-if="loggedInUser" @submit.prevent="updateUser(picture)">
        <label for="img-input-field"> Change Profile Picture: </label>
        <input class="img-input-field" v-model="picture" type="text" placeholder="Add image url here..">
        <button>Update Picture</button>
      </form>
    </div>
  `,
  //one user from messages.js, another - from onlineList.js
  // This because i don't wish to complicate if-else in created(), now its still readable :D 
  props : ['friend', 'user', 'user', 'loggedInUser']  
  ,                                 
  methods:{
    close() {
      this.$parent.close()
    },
    checkUserType(){
      if(this.friend){
        this.details = this.friend
      }else if(this.loggedInUser){
        this.details = this.loggedInUser
      }
      else{
        for(let friend of this.friendList){
          if(this.user.id === friend.id){
            this.details = friend
          }
        }
      }
      if(!this.details){
        this.details = this.user
      }   
    },
    async removeFriend(userId){
      let url = 'rest/friend-list/' + this.$store.state.currentUser.id + '/' + userId
      try{
        await fetch(url, {
          method: 'DELETE'
        })
      } catch(e){
        console.log(e)
      }
    },
    async addFriend(userId){
      let friendToAdd = {
        user1: this.$store.state.currentUser.id,
        user2: userId,
        time: Date.now()
      }

      let url = 'rest/friend-list'
      try{
        await fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(friendToAdd)
          })
      } catch(e){
        console.log(e)
      }
    },
    logOut() {
      this.$parent.logOut()
    },
    updateUser(){
      this.$parent.updateUser(this.picture)
      this.picture = ''
    }
  },
  data(){
    return{
      details: null,
      picture: ''
    }
  },
  created(){
    this.checkUserType()
  },
  updated(){
    this.checkUserType()
  },  
  computed:{
    friendList(){
      return this.$store.state.friendShips
    },
    currentUser(){
      return this.$store.state.currentUser
    }
  }
}