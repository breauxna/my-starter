import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { contextMiddleware } from "./middleware/context_middleware";
import { DataSources } from "./datasources/types";
import { MONGO_URL } from './datasources/constants';
import { productGetHandler, productsDeleteHandler, productsGetHandler, productsPatchHandler, productsPostHandler } from "./products/productHandlers";
import { ProductsDatasource } from "./products/productsDatasource";
const PORT = 3000;

async function createDataSources(client: MongoClient): Promise<DataSources> {
  const products = new ProductsDatasource(client);

  return {
    products,
  };
}

async function main() {
  const client = await MongoClient.connect(MONGO_URL);
  const dataSources = await createDataSources(client);
  const app = express();
  app.use(contextMiddleware({ dataSources }));
  app.use(express.json());
  app.use(cors());

  // Product routes
  app.get('/products', productsGetHandler);
  app.post('/products', productsPostHandler);
  app.get('/products/:productId', productGetHandler);
  app.patch('products/:productId', productsPatchHandler)
  app.delete('/products/:productId', productsDeleteHandler);
  
  app.listen(PORT, () => {
    console.log(`backend listening on PORT ${PORT}`);
  });
}

main();

