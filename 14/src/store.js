import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,

  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    }
  },
  //single aciton also can orginize dispatch chaining
  actions: {
    signup({commit, dispatch, state}, authData) {
      axios.post('/signupNewUser?key=AIzaSyDjtUnO9r6GKlGLJFjhHtRHf4Mu_Nyo1B4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true

      } )
        .then( response =>{
          commit('authUser', {
            token: response.data.idToken,
            userId: response.data.localId
          })
        }, error => console.log(error))
    },
    login({commit}, authData) {
      axios.post('/verifyPassword?key=AIzaSyDjtUnO9r6GKlGLJFjhHtRHf4Mu_Nyo1B4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true

      } )
      .then( response => {
        console.log(response.data)
        commit('authUser', {
          token: response.data.idToken,
          userId: response.data.localId
        })
      }, error => console.log(error))
    },
    
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})