
export const setShooting = ({ dispatch }, shooting) => {
	dispatch("SETSHOOTING", shooting);
};

export const setState = ({ dispatch }, state) => {
	dispatch("SETSTATE", state);
};

export const setInfo = ({ dispatch }, state) => {
  dispatch("SETINFO", state);
};
