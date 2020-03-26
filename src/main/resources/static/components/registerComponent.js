import { router } from "../router.js"

export default {
    template: `
    <section>
        <h1 class="registerPage">Welcome!</h1>
            <h2>Not a member, yet? Please, register to start a conversation!</h2>

           <nav>
            <form class="registerForm" @submit.prevent="registerNewMember">
            <h3 class="h3Register">Sign up:</h3>
            <input v-model="username" type="text" required placeholder="Enter username">
            <input v-model="password" type="text" :type="passwordType" required placeholder="Enter password">
            <button type="button" class="showPasswordButton" @click=showOrHidePassword>{{ buttonText }}</button>
            <button class="registerBtn">Sign up</button>
            <h4 class="h4Register">Already a member?</h4>
            <router-link class="signUp" to="/">Login</router-link>
            </form>
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
        users() {
            return this.$store.state.users
        }
    },
    methods: {
        async registerNewMember(){
            if(!this.username.trim() &&
            !this.password.trim()){
                return
            }
            let user = {
                username: this.username,
                password: this.password,
                role: ["admin", "user"]
            }

            try{
              await fetch('/rest/auth/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              })
            } catch(e){
              console.log(e)
            }
            
        
        //result = await result.json()

        //this.$store.commit('appendUser', result)

        this.username = ''
        this.password = ''
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
