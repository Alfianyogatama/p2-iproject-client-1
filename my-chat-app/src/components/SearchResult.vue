<template>
	<div class="mt-6">
		<div v-if="result.length !== 0">
			<p >SEARCH RESULT</p>
			<button @click="clearSearch" class="mt-2 button px-4 py-1 rounded text-white rounded-lg hover:bg-gray-100 hover:text-gray-800"><i class="fas fa-minus-circle text-red-800"></i> clear</button>
		</div>
		<div
			class="grid grid-cols-3 gap-4 conversation-list w-3/4 rounded mx-auto mt-6 mb-6"
		>
			<div v-for="group in result" :key="group.id">
				<div v-if="result.length !== 0">
					<div>
						<a @click.prevent="chatbox(group.name)" href="#">
							<div class="flex flex-col">
								<div class="mb-2">
									<img
										:src="group.imageUrl"
										class="rounded-full mx-auto"
										width="50"
									/>
								</div>
								<div class="rounded-full max-h-15">
									<button
										class="button border-2 border-purple-300 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover"
									>
										<i class="far fa-comment-alt"></i>#{{
											group.name
										}}
									</button>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from "sweetalert2";
export default {
	name: "ChatList",

	created() {
		this.$store.dispatch("getConversations");
	},

	computed: {
		result() {
			return this.$store.state.searchResult;
		},
	},

	methods: {
		async chatbox(id) {
			try {
				const join = await this.$store.dispatch("joinConversation", {
					id,
				});
				if (join) {
					this.$store.commit("SET_SEARCHRESULT", []);
					console.log(join);
					Swal.fire({
						text: `You are joining new group..`,
					});
				}
			} catch (err) {
				this.$store.commit("SET_SEARCHRESULT", []);
				console.log(err);
				this.$store.commit("SET_SEARCHRESULT", []);
				Swal.fire({
					text: "This room is not available right now",
					icon: "error",
				});
			}
		},

		clearSearch(){
			this.$store.commit('SET_SEARCHRESULT', [])
		}
	},
};
</script>

<style>
.chatlist-lastmessage {
	font-size: 12px;
	font-weight: 50;
}
</style>