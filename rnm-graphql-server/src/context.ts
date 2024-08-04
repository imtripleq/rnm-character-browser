import CharacterAPI from "./datasources/character-api";
import { CustomCharacterAPI } from "./datasources/custom-character-api";

export type DataSourceContext = {
  dataSources: {
    characterAPI: CharacterAPI;
    customCharacterAPI: CustomCharacterAPI;
  };
};
