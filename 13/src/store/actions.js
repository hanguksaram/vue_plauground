export const updateValue = ({commit}, payload) =>  {
    setTimeout(() => commit('updateValue', payload), 1000) 
}