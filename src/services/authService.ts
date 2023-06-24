import httpService from "./httpService";
import config from "../utils/config.json";
import { Account } from "../components/loginForm";
import jwtDecode from "jwt-decode";
import { User } from "../App";

const apiEndpoint = config.api + "auth";
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(user: Account) {
  const token = await httpService
    .post<string>(apiEndpoint, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  loginWithJwt(token);
  return token;
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token ?? "") as User;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey) ?? "";
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
