import { Collection, Document, MongoClient } from "mongodb";
import { DB_NAME } from "./constants";

export class Datasource<T extends Document> {
  private client: MongoClient;
  private collection: Collection<T>;
  constructor(client: MongoClient, collectionName: string) {
    this.client = client;
    const db = this.client.db(DB_NAME);
    this.collection = db.collection<T>(collectionName);
  }

  getCollection(): Collection<T> {
    return this.collection;
  }
}