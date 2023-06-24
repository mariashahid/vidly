import httpService from "./httpService";
import config from "../utils/config.json";
import { Account } from "../components/registerForm";

const apiEndpoint = config.api + "users";

export async function register(user: Account) {
  const userInDb = await httpService
    .post<Account>(apiEndpoint, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  return userInDb;
}
