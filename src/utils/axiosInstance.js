// // utils/axiosInstance.js
// let store;

// export const injectStore = (_store) => {
//   store = _store;
// };

// import axios from "axios";
// import { setSessionExpired } from "@/redux/slice/session-slice";
// // import more handlers if needed

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const status = error.response?.status;

//     if (!store) return Promise.reject(error); // prevent crash

//     switch (status) {
//       case 401:
//       case 403:
//         // 🔐 Unauthenticated or forbidden — session expired
//         store.dispatch(setSessionExpired(true));
//         break;

//       case 500:
//         // 💥 Server error — optional toast/log
//         console.error("Server Error (500):", error.response?.data);
//         break;

//       case 422:
//         // ⚠️ Validation error — maybe show toast
//         console.warn("Validation Error (422):", error.response?.data);
//         break;

//       default:
//         // 📌 Generic fallback if needed
//         console.warn(`Unhandled Error (${status}):`, error.response?.data);
//         break;
//     }

//     return Promise.reject(error);
//   },
// );

import axios from "axios";
import Cookies from "js-cookie";
import { setSessionExpired } from "@/redux/slice/session-slice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ✅ REQUEST INTERCEPTOR — Add token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (!store) return Promise.reject(error);

    switch (status) {
      case 401:
      case 403:
        store.dispatch(setSessionExpired(true));
        break;
      case 500:
        console.error("Server Error (500):", error.response?.data);
        break;
      case 422:
        console.warn("Validation Error (422):", error.response?.data);
        break;
      default:
        console.warn(`Unhandled Error (${status}):`, error.response?.data);
        break;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
