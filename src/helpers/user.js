export const getUserItem = (item) => {
  return localStorage.getItem(item);
};

export const setUser = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh-token", refreshToken);
  localStorage.setItem("startTimeOfToken", new Date());
};

export const initUser = (token, id, refreshToken) => {
  setUser(token, refreshToken);
  localStorage.setItem("user", id);
};

export const clearUser = () => {
  localStorage.clear();
};
