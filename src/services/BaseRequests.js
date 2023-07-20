import Api from "./Api";
import { notify } from "@kyvg/vue3-notification";

const errorMessage = (err) =>
  notify({
    title: "Authorization",
    text: err.message,
    type: "error",
  });

export const getBalance = () => {
  const token = localStorage.getItem("token");
  return Api()
    .get(`v2/users/me/balance?clientId=default&auth=${token}`)
    .catch((err) => errorMessage(err));
};
export const getListOfGames = () => {
  return Api()
    .get("v2/casino/games?clientId=default")
    .catch((err) => errorMessage(err));
};
export const getLinkOfGame = (id) => {
  return Api()
    .post(`/v2/casino/games/${id}/session-demo?clientId=default`)
    .catch((err) => errorMessage(err));
};
