import messages from './messages.js'
import messageInput from './messageInput.js'

export default {
  components: {
    messages,
    messageInput
  },
  template: `
  <div class="channelComponent">
    <div class="headerCard">
      <h2>{{ channel.name }}</h2>
    </div>
    <div class="onlineOffline" v-for="item in usersInChannels" :key="item.channel_id + item.user_id">
      <div v-for="user in users" :key="user.id">
        <h3>Online</h2>
        <p v-if="item.user_id === user.id && item.channel_id === channel.id && loggedInUsers.includes(user)">
          {{ user.name }}
        </p>
        <h3>Offline</h3>
        <p v-if="item.user_id === user.id && item.channel_id === channel.id && !loggedInUsers.includes(user)">
          {{ user.name }}
        </p>
      </div>
    </div>
    <messages />
    <messageInput />
  </div>
  `,
  computed: {
    channel(){
      return this.$store.state.currentChannel
    },
    usersInChannels(){
      return this.$store.state.userChannels
    },
    users(){
      return this.$store.state.users
    },
    loggedInUsers(){
      return this.$store.state.loggedInUsers
    }
  }
}