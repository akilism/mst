import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const state = {
	activeShooting: null,
	activeState: null,
  activeInfo: null
};

const mutations = {
  SETINFO (appState, info) {
    // console.log("SETINFO", info.title);
    state.activeInfo = info;
  },
	SETSHOOTING (appState, shooting) {
		// console.log("SETSHOOTING", shooting.city);
		state.activeShooting = shooting;
	},
	SETSTATE (appState, activeState) {
		// console.log("SETSTATE", activeState);
		state.activeState = activeState;
	}
}

export default new Vuex.Store({ state, mutations });
