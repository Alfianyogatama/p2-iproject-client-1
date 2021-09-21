<template>
  <div class="home flex">
    <Chatlist />
  </div>
</template>

<script>
// @ is an alias to /src
import Chatlist from '@/components/Chatlist'

export default {
  name: 'Home',
  components: {
    Chatlist
  }
}
</script>
