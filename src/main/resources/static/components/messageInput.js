//import ws from '../socket.js'

export default{
  template: `
      <div>
        <form class="messageForm" @submit.prevent="submitMessage">
        <textarea type="text" 
        v-model="messageInput" 
        placeholder="Type your message here..." 
        rows="10" 
        cols="30" 
        
        required></textarea>
        <button>Send</button>
        </form>
      </div>
  `,

  props: []
  ,

  data(){
      return{
         messageInput: ''
      }
  },
  
  methods: {
      async submitMessage(){
        if (this.messageInput != ''){

          let message;
          let messageBody = {
            user_id: this.$store.state.currentUser.id,
            content: this.messageInput,
            channel_id: this.currentChannel,
            message_time: Date.now()
          }
          try{
            message = await fetch('/rest/messages',{
              method: 'POST',
              body: JSON.stringify(messageBody),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          }catch(e){
          console.log(e)
          }
        }

        this.messageInput = ''
      }
  },

  computed: {
    currentChannel(){
      return this.$store.state.currentChannel
    }
  }
}