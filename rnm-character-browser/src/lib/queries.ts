import { gql } from "@apollo/client";

export const GET_CUSTOM_CHARACTERS = gql`
  query GetCustomCharacters {
    listCustomCharacters {
      id
      name
      status
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
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
      }
    }
  }
`;

export const GET_CUSTOM_CHARACTER = gql`
  query GetCustomCharacter($id: ID!) {
    getCustomCharacter(id: $id) {
      id
      name
      image
      status
      species
      origin {
        name
        id
        type
      }
      location {
        name
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        image
        species
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;
