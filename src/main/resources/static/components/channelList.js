export default{
  template: `
  <div class="channel">
    <h3>Your Channels:</h3>
    <div class="channelList" v-for="channel in userChannels" :key="channel.id">
      <h4 class="channelNameInList" @click="goToChannel(channel)">
        {{ channel.name }}
      </h4>
    </div>
    <div v-if="otherChannels()">
      <h3>All Channels:</h3>
      <div class="channelList" v-for="channel in allChannels" :key="channel.id">
        <h4 class="channelNameInList" @click="goToChannel(channel)" v-if="isChannelJoined(channel.id)">
          {{ channel.name }}
        </h4>
      </div> 
    </div>
  </div>
  `,
  computed: {
    userChannels(){
      return this.$store.state.userChannels
    },
    allChannels(){
      return this.$store.state.channels
    }
  },
  methods: {
    async goToChannel(channel){
      if (!this.userChannels.includes(channel)) this.addChannelToUserChannels(channel)
      this.$store.commit('setCurrentChannel', channel)
    },
    otherChannels(){
      for (let channel of this.allChannels){
        if (!this.userChannels.includes(channel)){
          return true
        }
      }
      return false
    },
    isChannelJoined(channelId){
      let isItJoined = true

      for (let channel of this.userChannels){
        if (channel.id === channelId){
          isItJoined = false
          break
        }
      }
      return isItJoined
    },
    async addChannelToUserChannels(channel){

      let channelToAdd = {
      channel_id: channel.id,
      user_id: this.$store.state.currentUser.id
      }

      console.log(channelToAdd)

      //add channel to currentUser's userChannels in database
      try{
        await fetch('/rest/userChannels', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(channelToAdd)
      })
      } catch(e){
        console.log(e)
      }

      //add channel to userChannels in store
      let url = '/rest/users/channels/id/' +  this.$store.state.currentUser.id
      let userChannels = await fetch(url)
      userChannels = await userChannels.json()
      this.$store.commit('displayUserChannels', userChannels)


      //post server message saying user has joined room
      const srvMsg = this.$store.state.currentUser.username + ' has just joined the channel!'

      console.log(srvMsg)

      let serverMessage = {
        message: srvMsg,
        channel_id: channel.id,
        time: Date.now()
      }

      try{
        await fetch('/rest/serverMessages', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(serverMessage)
        })
      } catch (e) {
        console.log(e)
      }
      
    }
  }
}