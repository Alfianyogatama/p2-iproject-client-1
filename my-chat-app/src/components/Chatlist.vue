<template>
	<div class="grid grid-cols-1 gap-4 conversation-list w-1/2 rounded mx-auto">
		<div 
		v-for="group in conversations" :key="group.id"
		class="mt-6">
			<a @click.prevent="chatbox(group.id)" href="#">
				<div class="flex flex-col">
					<div class="rounded-full max-h-15">
						<button class="button border-2 border-purple-300 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover"><i class="far fa-comment-alt"></i> {{group.id}}</button>
					</div>
					<small class="mt-3 italic chatlist-lastmessage">{{group.welcomeMessages[0]}}</small>
				</div>
			</a>
		</div>
		<div v-if="conversations.length === 0" class="mt-6">
			<p class="text-sm italic">You have not join in any group</p>
			<p class="text-sm italic">Create or search one to start chat....</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ChatList",

	created() {
		this.$store.dispatch("getConversations");
	},

	computed: {
		conversations() {
			return this.$store.state.groupLists;
		},
	},

	methods: {
		async chatbox(id) {
			await this.$store.commit("SET_SELECTGROUP", { id });
			const result = await this.$store.dispatch("getGroupInfo", {id})
			if (result) {
				this.$router.push({ name: "Chat", params: { id: id } });
			}
		},
	},
};
</script>

<style>
	.chatlist-lastmessage{
		font-size: 12px;
		font-weight: 50;
	}
</style>