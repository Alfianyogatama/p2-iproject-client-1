<template>
  <div class="about">
    <ul>
      <li v-for="(chat, i) in conversations" :key="i">
          
          <p>Subject : <a @click.prevent="chatbox(chat.id)" href="#">{{chat.subject}}</a></p>

          <p>last message : {{chat.welcomeMessages[0]}}</p>
      </li>
    </ul>
  </div>
</template>
<script>

export default{
  name : "Chat",
  created(){
    this.$store.dispatch('getConversations')
  },
  computed: {
    conversations(){
      return this.$store.state.conversationlists
    }
  },

  methods: {
    chatbox(id){
      this.$store.dispatch('chatbox', {conversationId:id})
    }
  }
}

</script>