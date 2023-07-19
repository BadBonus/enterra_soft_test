import { refresh } from "./Auth";
import { isTimeForRefresh } from "@/helpers";

// проверка на инициализации страницы
const logicOfRefreshToken = () => {
  const savedTime = localStorage.getItem("startTimeOfToken") ?? null;

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
