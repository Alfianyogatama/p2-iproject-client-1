<template>
	<div class="min-h-screen bg-gray-800 flex flex-wrap content-center">
		<form
			@submit.prevent="signUp"
			class="w-full mx-auto max-w-sm border-2 border-purple-500 py-5 px-3 rounded-xl shadow-2xl"
		>
			<div v-if="showImg" class="w-full mx-auto">
				<img :src="imgSrc" class="p-6 w-1/2 mx-auto rounded-full" />
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
					<i class="fas fa-user-ninja fa-3x"></i>
					<span class="mt-2 text-sm leading-normal"
						>Select Avatar</span
					>
					<input
						@change="getImage($event)"
						type="file"
						class="hidden"
					/>
				</label>
			</div>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-white font-thin text-sm md:text-right mb-1 md:mb-0 pr-4"
						for="inline-full-name"
					>
						Fullname
					</label>
				</div>
				<div class="md:w-2/3">
					<input
						v-model="signUpData.name"
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						id="inline-full-name"
						type="text"
						placeholder="Your Name"
					/>
				</div>
			</div>
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-white font-thin text-sm md:text-right mb-1 md:mb-0 pr-4"
						for="inline-full-name"
					>
						Email
					</label>
				</div>
				<div class="md:w-2/3">
					<input
						v-model="signUpData.email"
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						id="inline-full-name"
						type="email"
						placeholder="yours@mail.com"
					/>
				</div>
			</div>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-white font-thin text-sm md:text-right mb-1 md:mb-0 pr-4"
						for="inline-password"
					>
						Gender
					</label>
				</div>
				<div class="md:w-2/3">
					<select
						v-model="signUpData.gender"
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm"
					>
						<option disabled value="">Select one</option>
						<option value="male"><i class="fas fa-mars"></i> male</option>
						<option value="female"><i class="fas fa-venus"></i> female</option>
					</select>
				</div>
			</div>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label
						class="block text-white font-thin text-sm md:text-right mb-1 md:mb-0 pr-4"
						for="inline-password"
					>
						Password
					</label>
				</div>
				<div class="md:w-2/3">
					<input
						v-model="signUpData.password"
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						id="inline-password"
						type="password"
						placeholder="******************"
					/>
				</div>
			</div>

			<div class="flex items-center">
				<div class="mx-auto">
					<button
						v-if="loading"
						class="italic shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
						type="submit"
					>
						please wait...
					</button>
					<button
						v-else
						class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
						type="submit"
					>
						Sign Up
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
	name: "Login",
	data() {
		return {
			imgSrc:
				"https://ik.imagekit.io/61kwqbplekv7/input-image_ijus0TsbL.jpg",
			showImg: false,
			signUpData: {
				name: "",
				email: "",
				password: "",
				gender: "",
				image: "",
			},
		};
	},

	methods: {
		getImage(event) {
			this.signUpData.image = event.target.files[0];
			this.imgSrc = URL.createObjectURL(event.target.files[0]);
			this.showImg = true;
		},

		async signUp() {
			
			this.$store.commit("SET_ISLOAD", true);
			const form = new FormData();
			form.append("name", this.signUpData.name);
			form.append("email", this.signUpData.email);
			form.append("gender", this.signUpData.gender);
			form.append("password", this.signUpData.password);
			form.append("image", this.signUpData.image);

			const result = await this.$store.dispatch("userSignUp", form);
			if (result) {
				Swal.fire({
					text: 'You are Signed Up Successfully , please login',
					icon: 'success'
				})
				this.$router.push("/");
				this.$store.commit("SET_ISLOAD", false);

			}
		},
	},

	computed: {
		loading() {
			return this.$store.state.isLoad;
		},
	},
};
</script>

<style>
.register-change-image {
	font-size: 5px;
}
</style>