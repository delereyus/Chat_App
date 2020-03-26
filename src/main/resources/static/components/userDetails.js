
export default {
    template: `
      <div>
        <div class="modal">
          <div class="close-x">
              <button @click="close">Close</button>
        </div>
          <h2>{{ friendship.username }}</h2>
          <img :src="friendship.picture" alt="User Image" width="80" height="80">
          <p>Friend Since: {{ friendship.friendshipTime }}</p>
        </div>
      </div>
    `,
     props : ['friendship']
     ,
     methods:{
      close() {
        this.$parent.close();
      }
     }
  }