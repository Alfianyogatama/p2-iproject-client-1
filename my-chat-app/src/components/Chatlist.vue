<template>

	<div>
		<div v-if="conversations.length === 0"
		class="mx-auto mt-6 italic" 
		>
		<p>You have not join any group</p>
		<p>Create or search ...</p>
		<small> ex: #EPL</small>
		</div>
		<div v-else class="grid grid-cols-4 gap-6 conversation-list w-3/4 rounded mx-auto">

			<div
			v-for="group in conversations" :key="group.id"
			class="mt-6">
				<a @click.prevent="chatbox(group.name)" href="#">
					<div class="flex flex-col min-h-40 max-h-40 p-2 hover:shadow-xl">
						<div class="mb-2 flex-grow">
							<img :src="group.photoUrl" class="rounded-xl mx-auto" width="50" >
						</div>
						<div  class="flex-grow rounded-full max-h-15">
							<button class="button border-2 border-purple-300 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover"><i class="far fa-comment-alt"></i> {{group.name}}</button>
						</div>
						<div class="flex-grow rounded-full max-h-15">
							<button class="button text-white text-sm rounded hover mt-2">Topic: {{group.subject}}</button>
						</div>
						<div class="flex-none">
							<small class="italic chatlist-lastmessage">{{group.welcomeMessages[0]}}</small>
						</div>
					</div>
				</a>
			</div>
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