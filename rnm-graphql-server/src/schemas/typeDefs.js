// TODO: Finish all types and input
export const typeDefs = `#graphql
  type Character {
    id: ID
    name: String
    status: String
    image: String
    species: String
    origin: Origin
    location: Location
    episode: [Episode]
  }

  type PageInfo {
    count: Int
    pages: Int
    next: String
    prev: String
  }

  type CharacterResponse {
    results: [Character]
    info: PageInfo
  }

  type Origin {
    id: ID
    name: String
    type: String
  }

  type Location {
    created: String
    dimension: String
    id: ID
    name: String
    # residents: [Character]!
    type: String
  }

  type Episode {
    air_date: String
    # characters: [Character]!
    created: String
    episode: String
    id: ID
    name: String
  }

  input  FilterCharacter{
    gender: String
    name: String
    species: String
    status: String
    type: String
  }

  type Query {
    characters(page: Int, filter: FilterCharacter): CharacterResponse
    character(id: ID!): Character
  }
`;
