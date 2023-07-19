import { IIndexable } from "../components/common/tableBody";
import httpService from "./httpService";
import config from "../utils/config.json";

export const genres = [] as Genre[];

export async function getGenres() {
  const genres = await httpService.get<Genre[]>("genres").then((response) => {
    return response.data;
  });
  return genres;
}

export interface Genre extends IIndexable<any> {
  _id: string;
  name: string;
}
