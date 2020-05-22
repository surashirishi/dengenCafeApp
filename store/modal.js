export const state = () => ({
  isOpenModal: false
})
export const mutations = {
  setModalState(state, modalState) {
    state.isOpenModal = modalState
  }
}
export const getters = {
  isOpenModal (state) {
    return state.isOpenModal
  }
}
