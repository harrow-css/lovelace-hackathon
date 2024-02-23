export const state = () => ({
    programs: {}
  })

export const mutations = {
updateProgram(state, input) {
    // update the state
    console.log("updating state", input[0], input[1])
    state.programs[input[1]] = input[0]
}
}

export const getters = {
    getProgram(state, id) {
      return state.programs[id]
    }
  }