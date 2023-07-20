import Api from "./Api";
import { setUser, getUserItem, initUser } from "@/helpers/user.js";
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
      initUser(userData.attributes.token, userData.id, userData.attributes["refresh-token"]);

      notify({
        title: "Авторизация",
        text: "Авторизация прошла успешно! Добро пожаловать!",
      });
    })
    .catch(({ response }) => {
      notify({
        title: "Authorization",
        text: response.data.errors[0].detail,
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
        refreshToken: getUserItem("refresh-token"),
      },
      {
        "User-Agent": "Axios",
        headers: {
          Authorization: null,
        },
      },
    )
    .then(({ data }) => {
      setUser(data["token"], data["refresh-token"]);
    })
    .catch((err) => {
      notify({
        title: "Authorization",
        text: err.message + " : " + "refresh token error",
        type: "error",
      });
    });
};
