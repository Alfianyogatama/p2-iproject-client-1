<template>
	<div>
		<p v-for="chat in chats" :key="chat.id">{{chat.text}}</p>
	</div>	
</template>
<script>
	export default{
		name: "Chatbox",
		computed: {
			chats(){
				return this.$store.state.chatbox
			}
		}
	}
</script>

