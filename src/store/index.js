import { createStore } from "vuex";

export default createStore({
  state: {
    //selectedFiles: JSON.parse(localStorage.getItem("selectedFiles") || "[]"),
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
    uploudFiles(state, files) {
      state.selectedFiles = files;      
      // localStorage.setItem(
      //   "selectedFiles",
      //   JSON.stringify(state.selectedFiles)
      //);
      
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
    uploudFiles({ commit }, files) {
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

//http://localhost:8080/7320ba7b-e609-469b-a3e6-74723cc6d057
//.map(file=>window.URL.createObjectURL( file ))