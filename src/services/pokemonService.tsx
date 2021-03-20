import { request } from "../utils/request";

export default class SearchApi {
  static search = (): Promise<Promise<any>> =>
    request("https://pokeapi.co/api/v2/pokemon?limit=3&offset=6", "GET");

  static searchPokemon = (url: string): Promise<Promise<any>> =>
    request(url, "GET");
}
