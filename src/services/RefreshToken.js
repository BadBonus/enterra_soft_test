import { refresh } from "./Auth";
import { isTimeForRefresh } from "@/helpers";
import { getUserItem } from "@/helpers/user.js";

// проверка на инициализации страницы
const logicOfRefreshToken = () => {
  const savedTime = getUserItem("startTimeOfToken") ?? null;

  if (savedTime) {
    if (isTimeForRefresh(savedTime)) {
      refresh();
    }

    setInterval(() => {
      if (isTimeForRefresh(savedTime)) {
        refresh();
      }
    }, 30000);
  }
};

export default logicOfRefreshToken;
