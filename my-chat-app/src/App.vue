<template>
  <div id="app">
      <Navbar />
      <router-view />
      <Hfooter />
  </div>
</template>
<script>
  import Navbar from "@/components/Navbar"
  import Hfooter from "@/components/Hfooter"
  export default{
    name: "App",
    components: {
      Navbar,
      Hfooter
    },
    created(){
      if (localStorage.access_token) {
        this.$store.commit('SET_ISLOGIN', true)
      }
    },

    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
