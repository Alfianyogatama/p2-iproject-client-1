<template>
  <div class="flex w-full min-h-screen">
    <Chatlist />
    <div class="min-h-screen w-full">
      <Inbox />
    </div>
  </div>
</template>
<script>
import Inbox from '@/components/Inbox'
import Chatlist from '@/components/Chatlist'
export default{
  name : "Chat",
  data(){
    return{
      selectedGroupId : ""
    }
  },
  components: {
    Chatlist,
    Inbox
  },

  created(){
    this.$store.dispatch('getConversations')
    this.$store.commit('SET_SELECTGROUP', {id : 'SukaBola4'})
  },

  computed: {
    conversations(){
      return this.$store.state.conversationlists
    },
  },

  methods: {
    chatbox(id){
      this.$store.commit('SET_SELECTGROUP', {id})
      this.$router.push({name:'Conversation', params:{id : id}})
      }
  }
}

</script>

<style type="text/css">
  .conversation-list{
    background-color: #3d4454;
  }
</style>