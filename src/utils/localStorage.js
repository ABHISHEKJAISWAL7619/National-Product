export const storage = {
  get: (key) => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem(key) || "null");
  },
  set: (key, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },
};
