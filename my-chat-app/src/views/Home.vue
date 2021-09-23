<template>
  <div class="w-3/4 mx-auto bg-gray-800">
    <div
      class="home min-h-screen conversation-list shadow-xl w-full border border-4 border-purple-800 rounded mx-auto"
    >
      <div class="flex justify-around">
        <div>
          <router-link to="/addnewgroup">
            <button
              class="text-sm mt-6 text-white text-center hover:bg-gray-100 rounded py-1 px-2 hover:text-gray-800"
            >
              <i class="fas fa-plus"></i> add Group
            </button>
          </router-link>
        </div>
        <div class="text-sm">
          <form class="flex space-x-1 w-full mt-6 items-center">
            <div class="w-1/3">
              <button @click.prevent="search" class="text-white">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div class="w-2/3">
              <input
                v-model="searchId"
                type="text"
                class="rounded px-2 py-1"
                placeholder="Search other active group"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="mt-6 text-white">
        <p class="text-md">Joining :</p>
        <Chatlist />
        <SearchResult />
      </div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Chatlist from "@/components/Chatlist";
import SearchResult from "@/components/SearchResult";
export default {
  name: "Home",
  data() {
    return {
      searchId: "",
    };
  },

  components: {
    Chatlist,
    SearchResult,
  },
  methods: {
    async search() {
      await this.$store.dispatch("searchGroup", { id: this.searchId });
    },
  },
};
</script>