import router from "../router";

export const isTimeForRefresh = (endTime) => {
  const currentDifference = +((new Date() - new Date(endTime)) / (1000 * 60)).toFixed(1);
  const staticDifference = +(+process.env.VUE_APP_REFRESH_TIME / (1000 * 60)).toFixed(1);

  console.log(currentDifference >= staticDifference, currentDifference, staticDifference);
  return currentDifference >= staticDifference;
};

export const logOut = () => {
  localStorage.clear();
  router.push("/");
};
