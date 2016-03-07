import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const state = {
	activeShooting: null,
	activeState: null
};

const mutations = {
	SETSHOOTING (appState, shooting) {
		console.log("SETSHOOTING", shooting.city);
		state.activeShooting = shooting;
	},
	SETSTATE (appState, activeState) {
		console.log("SETSTATE", activeState);
		state.activeState = activeState;
	}
}

export default new Vuex.Store({ state, mutations });
