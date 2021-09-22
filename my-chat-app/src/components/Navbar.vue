<template>
	<nav class="flex justify-center space-x-3 p-3 w-3/4 mx-auto bg-gray-800 border-b-4 border-purple-400">
		<div 
		v-if="!isLogin"
		class="flex flex-col space-y-3">
			<div class="text-md text-white">MyChatApp</div>
			<div class="flex justify-center space-x-3">
				<router-link :to="{name:'Home'}">
				<button class="button px-3 py-1 rounded text-white text-sm">
					<i class="far fa-comments"></i> Don`t have an account ?</button>
				</router-link>
				<router-link :to="{name:'Register'}">
				<button 
				@click="toRegister"
				class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="fas fa-sign-in-alt"></i> Sign Up</button>
				</router-link>
			</div>
		</div>

		<div 
		v-if="isLogin"
		class="flex flex-col space-y-3">
			<div class="text-md text-white">MyChatApp</div>
			<div class="flex justify-center space-x-3">
				<router-link to="/">
				<button class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="far fa-comments"></i> Group Chat</button>
				</router-link>	
				<button @click="logout" class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="fas fa-sign-in-alt"></i> Logout</button>
			</div>
		</div>


	</nav>
</template>
<script>
	export default{
		name: "Navbar",
		computed: {
			pageActive(){
				return this.$store.state.page
			},

			isLogin(){
				return this.$store.state.isLogin	
			}
		},
		methods: {
			logout(){
				localStorage.clear()
				this.$store.commit('SET_ISLOGIN', false)
				this.$store.commit('SET_CONVLISTS', {data:[]})
				this.$store.commit('SET_USER', {user:[]})
				this.$router.push('/login')
			},

			toRegister(){
				this.$store.commit('SET_PAGE', "register")
			}

		}
	}
</script>
