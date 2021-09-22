<template>
	<div class="w-3/4 mx-auto min-h-screen bg-gray-800 flex flex-wrap content-center">
		<div class="w-full mx-auto text-purple-700 mb-6">
			<h1 class="text-3xl">Create new group within 1 minutes!</h1>
		</div>

		<form 
			@submit.prevent="addGroup"
			class="flex flex-col mx-auto w-3/4 mb-6">
			<div v-if="showImg" class="w-full mx-auto">
				<img :src="imgSrc" width="50" class="p-6 w-1/5 mx-auto rounded-full" />
				<div v-if="showImg" class="w-full mx-auto">
					<label
						class="w-1/2 flex flex-col mx-auto mb-3 py-1 items-center rounded-md shadow-md tracking-wide uppercase cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
					>
						<i class="fas fa-exchange-alt 1x"></i>
						<span
							class="register-change-image mt-1 text-sm leading-normal"
							>change</span
						>
						<input
							@change="getImage($event)"
							type="file"
							class="hidden"
						/>
					</label>
				</div>
			</div>

			<div v-if="!showImg" class="w-full mx-auto">
				<label
					class="w-1/2 flex flex-col mx-auto mb-3 items-center px-2 py-1 rounded-md shadow-md tracking-wide uppercase cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150"
				>
					<!-- <i class="fas fa-user-ninja fa-3x"></i> -->
					<i class="fas fa-cloud-upload-alt fa-3x"></i>
					<span class="mt-2 text-sm leading-normal"
						>Select the most iconic logo</span
					>
					<input
						@change="getImage($event)"
						type="file"
						class="hidden"
					/>
				</label>
			</div>


			<div
				class="flex mx-auto items-center border-b border-teal-500 py-1 mb-6"
			>
				<input
					v-model="addData.name"
					class="appearance-none bg-transparent border-none w-full text-sm text-white mr-3 py-1 px-2 leading-tight hover:bg-gray-500 rounded-lg focus:outline-none"
					type="text"
					placeholder="Unique Group Name"
				/>
			</div>
			<div
				class="flex mx-auto items-center border-b border-teal-500 py-2 mb-6"
			>
				<input
					v-model="addData.subject"
					class="appearance-none bg-transparent border-none w-full text-sm text-white mr-3 py-1 px-2 leading-tight hover:bg-gray-500 rounded-lg  focus:outline-none"
					type="text"
					placeholder="subject: ex football lovers"
				/>
			</div>
			<div
				class="flex mx-auto items-center border-b border-teal-500 py-2 mb-6"
			>
				<input
					v-model="addData.topic"
					class="appearance-none bg-transparent border-none w-full text-sm text-white mr-3 py-1 px-2 leading-tight hover:bg-gray-500 rounded-lg  focus:outline-none"
					type="text"
					placeholder="topic ex: sport"
				/>
			</div>
			<div
				class="flex mx-auto items-center border-b border-teal-500 py-2 mb-6"
			>
				<input
					v-model="addData.message"
					class="appearance-none bg-transparent border-none w-full text-sm text-white mr-3 py-1 px-2 leading-tight hover:bg-gray-500 rounded-lg focus:outline-none"
					type="text"
					placeholder="(optional) welcome message"
					aria-label="Full name"
				/>
			</div>
			<div
				v-if="!isLoading"
				class="flex mx-auto items-center border-b border-teal-500 py-2 mb-6"
			>
				<button
					class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
					type="submit"
				>
					Sign Up
				</button>
			</div>

			<div
				v-if="isLoading"
				class="flex mx-auto items-center border-b border-teal-500 py-2 mb-6"
			>
				<button
					class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
					type="button"
				>
					Please wait..
				</button>
			</div>

		</form>
	</div>
</template>
<script>
export default {
	name: "AddGroup",
	data() {
		return {
			imgSrc:
				"https://ik.imagekit.io/61kwqbplekv7/input-image_ijus0TsbL.jpg",
			showImg: false,
			addData: {
				name: "",
				subject: "",
				topic: "",
				message: "",
				image: "",
			},
		};
	},

	methods: {
		getImage(event) {
			this.addData.image = event.target.files[0];
			this.imgSrc = URL.createObjectURL(event.target.files[0]);
			this.showImg = true;
		},

		async addGroup() {

			this.$store.commit("SET_ISLOAD", true);
			const form = new FormData();
			form.append("name", this.addData.name);
			form.append("subject", this.addData.subject);
			form.append("topic", this.addData.topic);
			form.append("message", this.addData.message);
			form.append("image", this.addData.image);

			const result = await this.$store.dispatch("addGroup", form);
			if (result) {
				this.$router.push("/");
				this.$store.commit("SET_ISLOAD", false);
			}
		},
	},

	computed: {
		isLoading(){
			return this.$store.state.isLoad
		}
	}
};
</script>