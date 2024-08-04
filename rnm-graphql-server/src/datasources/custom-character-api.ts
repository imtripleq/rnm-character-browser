import { DynamoDB } from "aws-sdk";
import { DataSource } from "apollo-datasource";
import { CustomCharacter } from "../types";

export class CustomCharacterAPI extends DataSource {
  private dynamoDb: DynamoDB.DocumentClient;
  private tableName: string;

  constructor() {
    super();
    this.dynamoDb = new DynamoDB.DocumentClient({
      region: process.env.AWS_REGION,
    });
    this.tableName = process.env.CUSTOM_CHARACTER_TABLE || "";
  }

  async createCharacter(character: CustomCharacter) {
    try {
      const params = {
        TableName: this.tableName,
        Item: character,
      };
      await this.dynamoDb.put(params).promise();
      return character;
    } catch (error) {
      console.error("Error creating character:", error);
      throw new Error("Failed to create character");
    }
  }

  async getCharacter(id: string): Promise<CustomCharacter | null> {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
      };
      const result = await this.dynamoDb.get(params).promise();
      if (result.Item) {
        return { ...result.Item, isCustom: true } as CustomCharacter;
      }
      return null;
    } catch (error) {
      console.error("Error getting character:", error);
      throw new Error("Failed to get character");
    }
  }

  async listCharacters(): Promise<CustomCharacter[]> {
    try {
      const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: this.tableName,
      };
      const result = await this.dynamoDb.scan(params).promise();
      return (result.Items || []).map((item) => ({
        ...item,
        isCustom: true,
      })) as CustomCharacter[];
    } catch (error) {
      console.error("Error listing characters:", error);
      throw new Error("Failed to list characters");
    }
  }

  async deleteCharacter(id: string): Promise<string> {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
      };
      await this.dynamoDb.delete(params).promise();
      return id;
    } catch (error) {
      console.error("Error deleting character:", error);
      throw new Error("Failed to delete character");
    }
  }
}
