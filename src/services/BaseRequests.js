import Api from "./Api";

export default {
  getBalance({ token, ...data }) {
    return Api().get(`v2/users/me/balance?clientId=default&auth=${token}`, data);
  },
  getListOfGames(data) {
    return Api().get("v2/casino/games?clientId=default", data);
  },
  getLinkOfGame(data) {
    return Api().post("v2/casino/games?clientId=default", data);
  },
};
