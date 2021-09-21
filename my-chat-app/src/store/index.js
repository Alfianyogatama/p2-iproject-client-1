import Vue from 'vue'
import Vuex from 'vuex'
import api from './../apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : {},
    conversationlists: [],
    chatbox:[]
  },
  mutations: {
    SET_USER : (state, payload) => {
      state.user = payload.user
    } ,

    SET_CONVLISTS : (state, payload) => {
      state.conversationlists = payload.data
    },

    SET_CHATBOX : (state, payload) => {
      state.chatbox = payload.data
    }
  },
  actions: {
    userLogin : async ({commit}, payload) => {
      try{
        const {data} = await api.post('/login', payload.loginData)
        if (data) {
          commit(`SET_USER`, {
            user: data
          })

          localStorage.setItem('access_token',  data.access_token)

          return true
        }
      }
      catch(err){
        console.log(err);
      }
    },

    getConversations: async ({commit}) => {
      try{
        const {data} = await api.get('/chats/lists')
        if (data) {
          commit('SET_CONVLISTS', data)
        }
      }
      catch(err){
        console.log(err);
      }
    },

    chatbox: async({commit}, payload) => {
      try{
        const {data} = await api.get('/chats/groups/messages', payload, {})
        
        if (data) {
          console.log(data);
          commit('SET_CHATBOX', data.messages)
        }

      }
      catch(err){
        console.log(err);
      }
    }
  },  
  modules: {
  }
})
