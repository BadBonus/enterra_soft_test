import { refresh } from "./Auth";
import { isTimeForRefresh } from "@/helpers";
import { getUserItem } from "@/helpers/user.js";

let checkIntervalTimer = null;

// проверка на инициализации страницы
const logicOfRefreshToken = () => {
  let savedTime = getUserItem("startTimeOfToken") ?? null;

  if (savedTime) {
    if (isTimeForRefresh(savedTime)) {
      refresh();
      savedTime = getUserItem("startTimeOfToken");
    }

    checkIntervalTimer = setInterval(() => {
      if (isTimeForRefresh(savedTime)) {
        refresh();
        savedTime = getUserItem("startTimeOfToken");
      }
    }, 30000);
  }
};

export { checkIntervalTimer };

export default logicOfRefreshToken;
