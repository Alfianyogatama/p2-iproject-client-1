<template>
  <div class="home min-h-screen conversation-list w-1/2 rounded mx-auto">
    <div class="flex justify-around">
      <div>
        <button class="text-sm mt-6 text-white text-center hover:bg-gray-100 rounded py-1 px-2 hover:text-gray-800">
          <i class="fas fa-plus"></i> add Group</button>
      </div>
      <div class="text-sm">
        <form class="flex space-x-1 w-full mt-6 items-center">
          <div class="w-1/3">
            <label class="text-white"><i class="fas fa-search-plus"></i></label>
          </div>
          <div class="w-2/3">
            <input type="text" class="rounded px-2 py-1" placeholder="Group name">
          </div>
        </form>
      </div>
    </div>
    <div class="mt-6 text-white">
      <p class="text-md">RECENT : </p>
      <Chatlist />
    </div>
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
