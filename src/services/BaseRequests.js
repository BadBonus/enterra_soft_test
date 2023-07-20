import Api from "./Api";

export const getBalance = () => {
  const token = localStorage.getItem("token");
  return Api().get(`v2/users/me/balance?clientId=default&auth=${token}`, {});
};
export const getListOfGames = () => {
  return Api().get("v2/casino/games?clientId=default", {});
};
export const getLinkOfGame = (id) => {
  return Api().post(`/v2/casino/games/${id}/session-demo?clientId=default`);
};
