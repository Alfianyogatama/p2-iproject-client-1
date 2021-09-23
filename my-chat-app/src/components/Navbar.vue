<template>
	<nav class="flex justify-center space-x-3 p-3 mx-auto bg-gray-800 border-b-4 border-purple-400">
		<div 
		v-if="pageActive === 'login' && !isLogin"
		class="flex flex-col space-y-3">
			<div class="text-md text-white">FootballComunityChat</div>
			<div class="flex justify-center space-x-3">
				<button class="button px-3 py-1 rounded text-white text-sm">
					<i class="far fa-comments"></i> Don`t have an account ?</button>
				<button 
				@click="toRegister"
				class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="fas fa-sign-in-alt"></i> Sign Up</button>
			</div>
		</div>

		<div 
		v-if="isLogin"
		class="flex flex-col space-y-3">
			<div class="text-md text-white">FootballComunityChat</div>
			<div class="flex justify-center space-x-3">
				<router-link to="/">
				<button class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="far fa-comments"></i> Group Chat</button>
				</router-link>	
				<button @click="logout" class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="fas fa-sign-in-alt"></i> Logout</button>
			</div>
			<div>
				<small class="text-white">Username: {{userName}}</small>
			</div>
		</div>

		<div 
		v-if="pageActive === 'register' && !isLogin"
		class="flex flex-col space-y-3">
		<div class="text-md text-white">FootballComunityChat</div>
		<div class="flex justify-center space-x-3">
				<button class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="far fa-comments"></i> Already have an account</button>
				<button @click="login" class="button px-3 py-1 bg-white rounded hover:bg-gray-100 hover:text-blue-300">
					<i class="fas fa-sign-in-alt"></i> Login</button>
			</div>
		</div>

	</nav>
</template>
<script>
	import Swal from 'sweetalert2'
	export default{
		name: "Navbar",
		computed: {
			pageActive(){
				return this.$store.state.page
			},

			isLogin(){
				return this.$store.state.isLogin	
			},

			userName(){
				return localStorage.name
			}
		},
		methods: {
			logout(){
				localStorage.clear()
				this.$store.commit('SET_ISLOGIN', false)
				this.$store.commit('SET_CONVLISTS', {data:[]})
				this.$store.commit('SET_USER', {user:[]})
				this.$store.commit('SET_PAGE', "login")
				this.$router.push('/login')
				Swal.fire({
					text: "You're loged out",
					icon: 'success'
				})

			},

			toRegister(){
				this.$store.commit('SET_PAGE', "register")
				this.$router.push({path:'/register'})
			},

			login(){
				this.$store.commit('SET_PAGE', "login")
				this.$router.push({name: 'Login'})
			}

		}
	}
</script>
