import { router } from "../router.js"

export default{
    template:`
       <section>
            <h1 class="LogInPage">Welcome!</h1>
            <nav>
                <form class="loginForm" @submit.prevent="logIn">
                    <h3 class="h3LogIn">Log In:</h3>
                    <input v-model="username" type="text" placeholder="Enter username:" required>

                    <input v-model="password" type="text" :type="passwordType" placeholder="Enter password:" required>

                    <button type="button" class="showPasswordButton" @click=showOrHidePassword>{{ buttonText }}</button>
                    <button class="logInButton">Log In</button>
                </form>
                 <router-link class="signUp" to="/register">Sign Up</router-link>
            </nav>
       </section>
    `,
    data(){
        return{
            username: '',
            password: '',
            passwordType: 'password',
            buttonText: 'Show password',
        }
    },
    computed: {

    },

    created(){
    },
    methods:{
      async logIn(){
        const url = '/rest/auth/signin'

        const userToLogin = {
          username: this.username,
          password: this.password
        }        

        try{
          const alreadyLoggedIn = JSON.parse(localStorage.getItem('accessToken'))
          const us = alreadyLoggedIn.user.username

          console.log('You are already logged in as: ' + us + '!\n Please log out before attempting another login!')
        } catch (e){
          try{
            let result = await fetch(url, {
            method:'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(userToLogin)
            })

            result = await result.json()
            console.log(result.error)

            if (!result.error){
              let user = await fetch('/rest/users/' + result.id)
              user = await user.json()
  
            console.log(user)
  
            const userAndToken = {
              user: user,
              token: result.accessToken
            }

            let currentUser = await fetch('/rest/users/' + userAndToken.user.id)
            currentUser = await currentUser.json()
            this.$store.commit('loginUser', currentUser)
            this.loadUsers()
            this.loadUserChannels()
            this.loadMessages()
            this.loadChannels()
            this.loadFriendList()
            this.loadAllUserChannels()
            this.loadServerMessages()
            console.log(userAndToken)
            this.$store.commit('saveAccessToken', userAndToken)
            
          }

          } catch (e){
            console.log(e)
          }
        }
        router.push('/')          
      },

      showOrHidePassword(){
        if(this.passwordType === 'password') {
          this.passwordType = 'text'
          this.buttonText = 'Hide Password'
        } else {
          this.passwordType = 'password'
          this.buttonText = 'Show Password'
        }
      },
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

          let userChannelIds = []

          for (let usrChnl of this.$store.state.userChannels){
            userChannelIds.push(usrChnl.id)
          }

          let offlineMessages = this.$store.state.messages.filter(message => message.message_time > this.$store.state.currentUser.logoff_time && userChannelIds.includes(message.channel_id))
          console.log('Messages sent when you were offline:')
          console.log(offlineMessages)

          this.$store.commit('loadOfflineMessages', offlineMessages)
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
        this.$store.commit('setCurrentChannel', channels[0])
      },

      async loadServerMessages(){
        let messages = await fetch('/rest/serverMessages')
        messages = await messages.json()

        this.$store.commit('loadAllServerMessages', messages)
        console.log(this.$store.state.serverMessages)
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
      },

      async loadAllUserChannels() {
        let allChannels = await fetch('/rest/users/channels')
        allChannels = await allChannels.json()
        this.$store.commit('allUserChannels', allChannels)
        console.log(allChannels);
        
      }

    },
}