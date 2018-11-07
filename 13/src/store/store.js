
import Vuex from  'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state => {
            return state.counter * 2
        },
        stringCounter: state => {
            return state.counter + ' Clicks';
        }
    },
    mutations: {
        increment: (state, payload) => {
            state.counter += payload;
        },
        decrement: (state, payload) => {
            state.counter -= payload;
        }

    },
    actions: {
        increment: ({ commit }, payload) => {
            commit('increment', payload)
        },
        decrement: ({ commit }, payload) => {
            commit('decrement', payload)
        },
        asyncIncrement: ({ commit }, {by, duration}) => {
            setTimeout(() => {
                commit('increment', by);
            }, duration);
        },
        asyncDecrement: ({ commit }) => {
            setTimeout(() => {
                commit('decrement');
            }, 1000);
        },

    }   
})