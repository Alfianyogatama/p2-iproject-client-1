<template>
	<div class="w-full min-h-screen">
		<form  @submit.prevent="login" class="w-full mx-auto max-w-sm border-2 p-3 rounded-xl shadow-md">
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
						Email
					</label>
				</div>
				<div class="md:w-2/3">
					<input 
					v-model="loginData.email"
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="email" placeholder="yours@mail.com">
				</div>
			</div>
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
						Password
					</label>
				</div>
				<div class="md:w-2/3">
					<input 
					v-model="loginData.password"
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************">
				</div>
			</div>
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3"></div>
				<label class="md:w-2/3 block text-gray-500 font-bold">
					<input class="mr-2 leading-tight" type="checkbox">
					<span class="text-sm">
						Send me your newsletter!
					</span>
				</label>
			</div>
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
						Sign In
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default{
		name: "Login",
		data(){
			return{
				loginData: {
					email: "",
					password: ""
				}
			}
		},

		methods: {
			async login(){
				const result = this.$store.dispatch('userLogin', {loginData:this.loginData})
				if (result) {
					this.$router.push('/inbox')
				}
			}
		}
	}
</script>