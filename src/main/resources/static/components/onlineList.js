import user from "./user.js"


export default {
    components: {
    user
    },
    template: `
        <div class="onlineList">
            <h2>Users</h2>
            <h3>Online:</h3>
                <ul>
                    <li v-for="user in online" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>
                <h3>Offline:</h3>
                <ul>
                    <li v-for="user in offline" 
                    :key="user.id"
                    v-if="user.id !== currentUser.id">
                    <h4>{{ user.username }}</h4>          
                    </li>
                </ul>          
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
        /**/ 
    },
    offline(){
      return this.users.filter(user => user.online === false)
    }
  },
  methods: {
    
  }
}