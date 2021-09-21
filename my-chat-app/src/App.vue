<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/conversation">Chat</router-link> |
      <router-link to="/login">login</router-link> |
      <a @click.prevent="logout" href="#">logout</a>
      <router-view />
    </div>
  </div>
</template>
<script>
  // import Inbox from "@/components/Inbox"
  export default{
    name: "App",
    components: {
      // Inbox
    },
    created(){
      if (localStorage.access_token) {
        this.$store.commit('SET_ISLOGIN')
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
