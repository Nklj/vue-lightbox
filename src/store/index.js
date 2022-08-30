import { createStore } from "vuex";
import api from '@/api/idb'

export default createStore({
  state: {    
    selectedFiles:  [],
    selectedScreen: localStorage.getItem("selectedScreen") || "fill",
    fullScreen: false,
    
  },
  getters: {
    selectedFiles: (s) => s.selectedFiles,
    selectedScreen: (s) => s.selectedScreen,
    fullScreen: (s) => s.fullScreen,
  },
  mutations: {
    setImgs(state, imgs) {
      state.selectedFiles = imgs[imgs.length-1]||[];
    },

    uploudFiles(state, files) {
      state.selectedFiles = files;       
      
    },
    updateSelectedScreen(state, screen) {
      state.selectedScreen = screen;
      localStorage.setItem("selectedScreen", screen);
    },
    updateFullScreen(state) {
      state.fullScreen = !state.fullScreen;
     
    },
  },
  actions: {
    async getImgs ({ commit }) {
      let imgs = await api.getImgs()
      commit('setImgs', imgs)
    },

    async uploudFiles({ commit }, files) {      
      await api.saveImgs(files)
      commit("uploudFiles", files);
    },
    updateSelectedScreen({ commit }, screen) {
      commit("updateSelectedScreen", screen);
    },
    updateFullScreen({ commit }) {
      commit("updateFullScreen");
    },
  },
});

