import Api from "./Api";
import { notify } from "@kyvg/vue3-notification";

export const signIn = ({ login, password }) => {
  return Api()
    .post("v2/login?clientId=default", {
      clientId: "default",
      login,
      password,
    })
    .catch((err) => {
      notify({
        title: "Authorization",
        text: err.message,
        type: "error",
      });
    });
};

export const updateToken = (credentials) => {
  return Api().post("auth/token?clientId=default", credentials);
};
