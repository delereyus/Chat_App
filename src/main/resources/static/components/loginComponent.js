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

        const userToLogin = 'username=' +
        encodeURIComponent(username)
        + '&password=' +
        encodeURIComponent(password)        

        try{
          const alreadyLoggedIn = JSON.parse(localStorage.getItem('accessToken'))
          const us = alreadyLoggedIn.user

          console.log('You are already logged in as: ' + us.username + '!\n Please log out before attempting another login!')
        } catch (e){
          try{
            let result = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: userToLogin
            })
  
            result = await result.json()
            console.log(result)
  
            let user = await fetch('/rest/users/' + result.id)
            user = await user.json()
  
            console.log(user)
  
            const userAndToken = {
              user: user,
              token: result.accessToken
            }
  
            console.log(userAndToken)
  
            this.$store.commit('saveAccessToken', userAndToken)
            
            console.log(this.$store.state.userAndToken)
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
      }
      
    }
}