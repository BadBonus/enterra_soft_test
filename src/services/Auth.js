import Api from "./Api";
import { notify } from "@kyvg/vue3-notification";

export const signIn = ({ login, password }) => {
  return Api()
    .post("v2/login?clientId=default", {
      clientId: "default",
      login,
      password,
    })
    .then((answer) => {
      if (!answer) {
        return;
      }

      const userData = answer.data.data[0];
      localStorage.setItem("token", userData.attributes.token);
      localStorage.setItem("refresh-token", userData.attributes["refresh-token"]);
      localStorage.setItem("user", userData.id);
      localStorage.setItem("startTimeOfToken", new Date());

      notify({
        title: "Авторизация",
        text: "Авторизация прошла успешно! Добро пожаловать!",
      });
    })
    .catch((err) => {
      notify({
        title: "Authorization",
        text: err.message,
        type: "error",
      });
    });
};

export const refresh = () => {
  return Api()
    .post(
      "auth/token?clientId=default",
      {
        clientId: "default",
        refreshToken: localStorage.getItem("refresh-token"),
      },
      {
        "User-Agent": "Axios",
        headers: {
          Authorization: null,
        },
      },
    )
    .then(({ data }) => {
      localStorage.setItem("token", data["token"]);
      localStorage.setItem("refresh-token", data["refresh-token"]);
      localStorage.setItem("startTimeOfToken", new Date());
    })
    .catch((err) => {
      notify({
        title: "Authorization",
        text: err.message + " : " + "refresh token error",
        type: "error",
      });
    });
};
