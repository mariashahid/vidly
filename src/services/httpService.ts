import axios from "axios";
import Toastify from "toastify";
import auth from "../services/authService";

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      Toastify.error("An unexpected errror occurred");
    }
    return Promise.reject(error);
  }
);

export function setJwt(jwt: string) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
