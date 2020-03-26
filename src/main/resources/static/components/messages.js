export default{
    template:`
      <div class="messages">
        <div v-for="(message, i) in messages" :key="message.id">
          <div v-if="message.channel_id === currentChannel">
            <div v-for="user in users" :key="user.id">
              <div class="messageDiv" v-if="message.user_id === user.id">
                <img class="messagePicture" :src=user.picture_url>
                <p class="messageParagraph">{{ user.username }}: {{ message.content }}, {{ message.message_time }}</p>
                <div v-if="message.user_id === currentUser.id" class="removeMessage" @click="askIfDelete(message.id)">🗑️</div>
                <button v-if="removing === message.id" class="deleteMsgButton" @click="deleteMessage(message.id, i)">Delete message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,

    props: []
    ,

    data(){
        return {
          removing: ''
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
      }
    },
    created(){
      
    }
}