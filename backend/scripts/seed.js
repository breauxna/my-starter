import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://root:password123@localhost:27017";
const DB_NAME = "testdb";
const SEED_AMOUNT = 500;

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DB_NAME);

    const productsData = []
    for (let i = 0; i < SEED_AMOUNT; i++) {
      productsData.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        imageUrl: faker.image.urlPicsumPhotos(),
        createdAt: new Date(),
      });
    }

    await db.collection("products").insertMany(productsData);
    console.log("Inserted products");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
