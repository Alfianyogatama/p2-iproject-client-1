<template>
	<div class="grid grid-cols-3 gap-4 conversation-list w-1/2 rounded mx-auto">
		<div 
		v-for="group in conversations" :key="group.id"
		class="mt-6">
			<a @click.prevent="chatbox(group.id)" href="#">
				<div class="flex flex-col">
					<div class="rounded-full max-h-15">
						<button class="button px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover"><i class="far fa-comment-alt"></i> {{group.id}}</button>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "ChatList",

	created() {
		this.$store.dispatch("getConversations");
		this.$store.commit("SET_SELECTGROUP", { id: "SukaBola4" });
	},

	computed: {
		conversations() {
			return this.$store.state.conversationlists;
		},
	},

	methods: {
		chatbox(id) {
			this.$store.commit("SET_SELECTGROUP", { id });
			this.$router.push({ name: "Chat", params: { id: id } });
		},
	},
};
</script>