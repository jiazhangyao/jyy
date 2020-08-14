export default {
  namespaced: true,
  state: {
    baseInfo: null,
    contactInfo: null,
    imgInfo: null,
    editable: false
  },
  mutations: {
    setBaseInfo(state, data) {
      state.baseInfo = data;
    },
    setContactInfo(state, data) {
      state.contactInfo = data;
    },
    setImgInfo(state, data) {
      state.imgInfo = data;
    },
    setEditable(state, data) {
      state.editable = data
    }
  },
  actions: {
  }
};