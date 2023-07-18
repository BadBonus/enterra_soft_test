import Api from "./Api";

export default {
  signIn(credentials) {
    return Api().post("v2/login?clientId=default", credentials);
  },
  updateToken(credentials) {
    return Api().post("auth/token?clientId=default", credentials);
  },
};
