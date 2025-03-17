import { Filter, MongoClient, ObjectId, SortDirection } from "mongodb";
import { Datasource } from "../datasources/datasource";

const PRODUCTS_COLLECTION = 'products';

export interface GetCollectionOptions {
  limit?: number;
  skip?: number;
  search?: string;
  sort?: {
    key: string;
    dir: SortDirection;
  };
}

class Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  isDeleted?: boolean;

  constructor(product: Product) {
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.imageUrl = product.imageUrl;
    this.createdAt = product.createdAt ?? new Date();
  }
}

export class ProductsDatasource extends Datasource<Product> {
  constructor(client: MongoClient) {
    super(client, PRODUCTS_COLLECTION);
    this.getCollection().createIndex({ name: "text", description: "text" })
  }

  async createProduct({
    name,
    price,
    description,
    imageUrl,
  }: Product): Promise<Product> {
    const newProduct = {
      name,
      price,
      description,
      imageUrl,
    };

    const product = new Product(newProduct);
    await this.getCollection().insertOne(product);

    return product;
  }

  async getProducts({limit, skip, search, sort}: GetCollectionOptions): Promise<[products: Product[], totalCount: number]> {
    const query: Filter<Product> = { isDeleted: { $ne: true } };
    if (search) {
      query.$text = { $search: `\"${search}\"` };
    }

    let cursor = this.getCollection().find(query)

    if (skip && skip > 0) {
      cursor = cursor.skip(skip);
    }

    if (limit && limit > 0) {
      cursor = cursor.limit(limit);
    }

    if (sort) {
      cursor = cursor.sort(sort.key, sort.dir);
    }

    return Promise.all([
      cursor.toArray(),
      this.getCollection().countDocuments(query),
    ]);
  }

  async getProductById(_id: ObjectId): Promise<Product | null> {
    return this.getCollection().findOne({ _id });
  }

  async deleteProduct(id: ObjectId): Promise<boolean> {
    await this.getCollection().updateOne({ _id: id}, {
      $set: {
        isDeleted: true,
      }
    });

    return true;
  }
}