import Api from "./Api";
import { notify } from "@kyvg/vue3-notification";
import { getUserItem } from "@/helpers/user.js";

const errorMessage = (err) =>
  notify({
    title: "Authorization",
    text: err.message,
    type: "error",
  });

export const getBalance = () => {
  const token = getUserItem("token");
  return Api()
    .get(`v2/users/me/balance?clientId=default&auth=${token}`)
    .catch((err) => errorMessage(err));
};
export const getListOfGames = (pageNumber = 1) => {
  const url = `casino/game-list?clientId=default%3Fpage%3D1%3FperPage%3D30&page=${pageNumber}&per-page=15`;

  return Api()
    .get(url)
    .catch((err) => errorMessage(err));
};
export const getLinkOfGame = (id) => {
  return Api()
    .post(`/v2/casino/games/${id}/session-demo?clientId=default`)
    .catch((err) => errorMessage(err));
};
