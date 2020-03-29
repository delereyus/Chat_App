export default{
    template: `
      <div>
        <form @submit.prevent="createNewChannel">
            <input v-model="name" type="text"
            required
            placeholder = "Enter channel name...">

            <button>Create New Channel</button>

        </form>
       </div>
    `,

     props: []
     ,

    data() {
        return {
            name: ''
        }
    },

    methods: {
        async createNewChannel(){
            if (this.name != ''){
            
            let newChannel = {
                name: this.name,
                adminid: this.$store.state.currentUser.id
            }

        try{
            let channel = await fetch('/rest/channels',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newChannel)
            })

            this.name = ''

        } catch(e){
             console.log("could not post message")
             console.log(e)
            }
        }

    }
   }
}

