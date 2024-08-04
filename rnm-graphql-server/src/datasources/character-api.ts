import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from "dotenv";
import { CharacterResponse, Character } from "../types";

dotenv.config();

class CharacterAPI extends RESTDataSource {
  override baseURL = process.env.API_URL;

  async getCharacters(page: number, filter: any): Promise<CharacterResponse> {
    return this.post("", {
      body: {
        query: `
          query ($page: Int, $filter: FilterCharacter) {
            characters(page: $page, filter: $filter) {
              results {
                id
                name
                status
                image
                species
                gender
                type
                origin {
                  name
                }
                location {
                  name
                }
                episode {
                  episode
                  name
                  created
                  id
                  air_date
                }
              }
              info {
                count
                pages
                next
                prev
              }
            }
          }
        `,
        variables: { page, filter },
      },
    }).then((response) => response.data.characters);
  }

  async getCharacter(id: string): Promise<Character> {
    return this.post("", {
      body: {
        query: `
          query ($id: ID!) {
            character(id: $id) {
              id
              name
              status
              image
              species
              gender
              type
              origin {
                name
                id
                type
              }
              location {
                name
              }
              episode {
                episode
                name
                created
                id
                air_date
              }
            }
          }
        `,
        variables: { id },
      },
    }).then((response) => response.data.character);
  }
}

export default CharacterAPI;
