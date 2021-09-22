import Vue from 'vue'
import Vuex from 'vuex'
import api from './../apis'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    page: "login",
    selectedGroup : {
      id : ""
    },
    user : {},
    groupLists: [],
    groupInfo:{},
    featureShow:{},
    isLoad: false,
    searchResult: []
  },
  mutations: {
    SET_ISLOGIN : (state, payload) => {
      state.isLogin = payload
    },

    SET_PAGE : (state, payload) => {
      state.register = payload
    },

    SET_USER : (state, payload) => {
      state.user = payload.user
    },

    SET_CONVLISTS : (state, payload) => {
      state.groupLists = payload
    },

    SET_SELECTGROUP : (state, payload) => {
      state.selectedGroup.id = payload.id
    },

    SET_GROUPINFO : (state, payload) => {
      state.groupInfo = payload
    },

    SET_FEATURE : (state, payload) => {
      state.featureShow = payload
    },

    SET_ISLOAD: (state, payload) => {
      state.isLoad = payload
    },

    SET_SEARCHRESULT: (state, payload) => {
      state.searchResult = payload
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

    userSignUp: async ({commit}, payload) => {
      try{
        const {data} = await api.post('/register', payload)
        if (data) {
          commit(`SET_USER`, {
            user: data
          })
          commit('SET_PAGE', 'app')
          localStorage.setItem('access_token',  data.access_token)
          return true
        }
      }
      catch(err){
        console.log(err.response);
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
          commit('SET_CONVLISTS', data.chats)
          return true
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
        console.log(err.response);

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
          console.log(data);
          return true
        }

      }
      catch(err){
        console.log(err);
        throw (err)
      }
    },

    getGroupInfo: async({commit}, payload) => {
      try{
        const {data} = await api.get(`/chats/groups/info/${payload.id}`)
        
        if (data) {
          commit('SET_GROUPINFO', data)
          return true
        }

      }
      catch(err){
        console.log(err);
      }
    },

    addGroup: async({dispatch}, payload) => {
      try{
        const {data} = await api.post(`/chats/groups`, payload)
        
        if (data) {
          dispatch('getConversations')
          return true
        }

      }
      catch(err){
        console.log(err.response);
      }
    },

    searchGroup: async({commit}, payload) => {
      try{
        const {data} = await api.get(`/chats/groups/${payload.id}`)
        if (data) {

          commit('SET_SEARCHRESULT', data)
          return true
        }
      }
      catch(err){
        console.log(err.response);
      }
    }

  },  

})
