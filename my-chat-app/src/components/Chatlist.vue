<template>
	<div class="conversation-list w-1/4 rounded">
      <div class="flex flex-col">
        <p class="text-xl mt-3 text-white text-center">Chanel lists</p>
      </div>
      <div class="mt-6">
        <button 
        v-for="group in conversations" :key="group.id"
        @click="chatbox(group.id)"
        class="button px-3 py-1 text-left text-md text-black bg-white border-b-2 mb-3 w-75 rounded"># {{group.id}}</button>
      </div>
    </div>
</template>

<script>
	export default{
		name: "ChatList",
		
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