export default {
  template: `
  <div>
    <h3 class="channelNameAdminWindow">{{ currentChannel.name }}</h3>
    <form class="changeChannelName" @submit.prevent="changeChannelName">
      <label for="newName">Change channel name</label>
      <input type="text" v-model="newChannelName" name="newName" placeholder="Enter new channel name..." required>
      <button class="changeChannelNameButton">Submit</button>
    </form>

    <div class="kickUsersDiv">
      <div class="usersToKick" v-for="user in users" :key="user.id" v-if="userInChannel(user)">
        <div class="usersInChannels">
          <p class="userInAdminWindow">{{ user.username }}</p>
          <p class="kickUser" @click="askIfKick(user)">🗑️</p>
          <button type="button" @click="kickUser(user)" v-if="kicking === user.id">Kick user</button>
        </div>
      </div>
    </div>

    <div class="deleteChannelButtonDiv" v-if="currentChannel.id !== allChannels[0].id">
      <button type="button" class="deleteChannelButton" @click="showDeleteConfirmation">Delete channel</button>
      <button type="button" class="confirmDeleteChannel" v-if="confirmDeleteButton" @click="deleteChannel">Confirm</button>
    </div>
    
  </div>
  `,

  data(){
    return {
      newChannelName: '',
      kicking: '',
      confirmDeleteButton: false
    }
  },

  computed: {
    users(){
      return this.$store.state.users
    },
    userChannels(){
      return this.$store.state.allUserChannels
    },
    currentChannel(){
      return this.$store.state.currentChannel
    },
    allChannels(){
      return this.$store.state.channels
    }
  },

  methods: {
    showDeleteConfirmation(){
      if (!this.confirmDeleteButton) {
        this.confirmDeleteButton = true
      } else this.confirmDeleteButton = false
    },

    async deleteChannel(){
      await fetch('/rest/channels/' + this.currentChannel.id, {
        method: 'DELETE'
      })
    },

    askIfKick(user){
      if (this.kicking != user.id){
        this.kicking = user.id
      } else this.kicking = ''
    },

    async changeChannelName(){

      let channelAndName = {
        id: this.currentChannel.id,
        name: this.newChannelName,
        adminid: this.currentChannel.adminid
      }

      try{
        await fetch('/rest/channels', {
          method:'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(channelAndName)
        })
      } catch(e){
        console.log(e)
      }

      const srvMsg = this.$store.state.currentUser.username + ' changed the channel name to "' + this.newChannelName + '"!'

      const newServerMessage = {
        message: srvMsg,
        channel_id: this.currentChannel.id,
        time: Date.now()
      }

      try {
        await fetch('/rest/serverMessages', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(newServerMessage)
        })
      } catch (error) {
        console.log(error)
      }

    },
    userInChannel(user){
      for (let usCh of this.userChannels){
        if (usCh.user_id === user.id && usCh.channel_id === this.currentChannel.id && usCh.user_id !== this.$store.state.currentUser.id){
          return true
        }
      }
      return false
    },
    async kickUser(user){

      const userChannelToRemove = {
        channel_id: this.currentChannel.id,
        user_id: user.id
      }

      try{
        await fetch('/rest/userChannels', {
          method:'DELETE',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(userChannelToRemove)
        })
      } catch (e){
        console.log(e)
      }

      const srvMsg = user.username + ' has just been KICKED from the channel!'

      const newServerMessage = {
        message: srvMsg,
        channel_id: this.currentChannel.id,
        time: Date.now()
      }

      try{
        await fetch('rest/serverMessages', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(newServerMessage)
        })
      } catch(e){
        console.log(e)
      }
      this.kicking = ''
    }

  }
}