/**
 * @type {import('@apollo/server').IResolvers}
 */

import axios from "axios";

// Resolvers query has to match with frontend to avoid returning null value to the frontend request
export const resolvers = {
  Query: {
    characters: async (_, { page, filter }) => {
      const query = `
          query($page: Int, $filter: FilterCharacter) {
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
        `;

      const res = await axios.post(process.env.API_URL, {
        query,
        variables: { page, filter },
      });

      return res.data.data.characters;
    },
    character: async (_, { id }) => {
      const query = `
          query($id: ID!) {
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
        `;

      const res = await axios.post(process.env.API_URL, {
        query,
        variables: { id },
      });

      return res.data.data.character;
    },
  },
};
