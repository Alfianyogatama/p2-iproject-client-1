import Vue from 'vue'
import Vuex from 'vuex'
import api from './../apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    selectedGroup : {
      id : ""
    },
    user : {},
    conversationlists: [],
    chatbox:[],
    featureShow:{}
  },
  mutations: {
    SET_ISLOGIN : (state, payload) => {
      state.isLogin = payload
    },

    SET_USER : (state, payload) => {
      state.user = payload.user
    },

    SET_CONVLISTS : (state, payload) => {
      state.conversationlists = payload.data
    },

    SET_SELECTGROUP : (state, payload) => {
      state.selectedGroup.id = payload.id
    },

    SET_CHATBOX : (state, payload) => {
      state.chatbox = payload.data
    },

    SET_FEATURE : (state, payload) => {
      state.featureShow = payload
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
          commit('SET_ISLOGIN', true)
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
        const {data} = await api.get('/chats/lists', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        if (data) {
          commit('SET_CONVLISTS', data)
          return data
        }
      }
      catch(err){
        console.log(err);
      }
    },

    getFootballStandings: async({commit}, payload) =>{
      try{
        const {data} = await api.get(`/feature/leagues/standings/${payload}`)
        if (data) {
          console.log(data);
          commit('SET_FEATURE', data)
          return true
        }

      }
      catch(err){
        console.log(err);

      }
    },

    joinConversation: async({dispatch}, payload) => {
      try{
        const {data} = await api.post(`/chats/join`, {conversationId:payload.id},{
          headers: {
            access_token: localStorage.access_token
          }
        })

        if (data) {
          dispatch('getConversations')
          return true
        }

      }
      catch(err){
        console.log(err);
      }
    }

    // chatbox: async({commit}, payload) => {
    //   try{
    //     const {data} = await api.get('/chats/groups/messages', payload, {})
        
    //     if (data) {
    //       commit('SET_CHATBOX', data.messages)
    //     }

    //   }
    //   catch(err){
    //     console.log(err);
    //   }
    // },

  },  

})
