import { Resolvers } from "./types";
import { v4 as uuidv4 } from "uuid";

export const resolvers: Resolvers = {
  Query: {
    characters: async (_, { page, filter }, { dataSources }) => {
      return dataSources.characterAPI.getCharacters(page, filter);
    },
    character: async (_, { id }, { dataSources }) => {
      return dataSources.characterAPI.getCharacter(id);
    },
    getCustomCharacter: async (_, { id }, { dataSources }) => {
      const character = await dataSources.customCharacterAPI.getCharacter(id);
      if (!character) {
        throw new Error("Character not found");
      }
      return character;
    },
    listCustomCharacters: async (_, __, { dataSources }) => {
      return dataSources.customCharacterAPI.listCharacters();
    },
  },
  Mutation: {
    createCharacter: async (_, { input }, { dataSources }) => {
      const newCharacter = {
        ...input,
        id: input.id || uuidv4(),
      };
      return dataSources.customCharacterAPI.createCharacter(newCharacter);
    },
    deleteCharacter: async (_, { id }, { dataSources }) => {
      return dataSources.customCharacterAPI.deleteCharacter(id);
    },
  },
};
