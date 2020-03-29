import userDetails from '../components/userDetails.js'
export default{
  components:{
    userDetails
  },
    template:`
      <div class="messages">
        <div v-for="(message, i) in messages" :key="message.id">
          <div v-if="message.channel_id === currentChannel">
            <div v-for="user in users" :key="user.id" @click="goToUserDetails(user)">
              <div class="messageDiv" v-if="message.user_id === user.id">
                <img class="messagePicture" :src=user.picture_url>
                <p class="messageParagraph">{{ user.username }}: {{ message.content }}, {{ message.message_time }}</p>
                <div v-if="message.user_id === currentUser.id" class="removeMessage" @click="askIfDelete(message.id)">🗑️</div>
                <button v-if="removing === message.id" class="deleteMsgButton" @click="deleteMessage(message.id, i)">Delete message</button>
              </div>
            </div>
          </div>
        </div>
            <div v-if="showModal" class="modal-route">
                  <div class="modal-content"> 
                    <userDetails :user="clickedUser"/>
                  </div>
            </div>
      </div>
    `,

    data(){
        return {
          removing: '',
          clickedUser: null,
          showModal: false
        }
    },

    methods:{
      askIfDelete(messageId){
        if (this.removing !== messageId){
          this.removing = messageId
        } else this.removing = ''
        
      },
      async deleteMessage(messageId, index){
        let url = 'rest/messages/' + messageId + '/' + index
        try {
          await fetch(url, {
            method: 'DELETE'
          })
        } catch(e){
          console.log(e)
        }
      },
      goToUserDetails(user){
        if(user.id === this.currentUser.id) return
        this.clickedUser = user
         this.showModal = true
       },
      close() {
         this.showModal = false;
       }
    },

    computed: {
      messages(){
        return this.$store.state.messages
      },
      users(){
        return this.$store.state.users
      },
      currentChannel(){
        return this.$store.state.currentChannel
      },
      currentUser(){
        return this.$store.state.currentUser
      },
    },
    created(){
      
    }
}