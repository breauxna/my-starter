import { Request, Response } from 'express';
import { ProductValidator } from './productValidator';
import { GetCollectionOptions } from './productsDatasource';
import { ObjectId } from 'mongodb';

export interface ProductQueryParams {
  limit?: string;
  skip?: string;
  search?: string;
  sort?: string;
}

const parseQueryParams = (params: ProductQueryParams): GetCollectionOptions => {
  const res: GetCollectionOptions = {};

  if (params.search) {
    res.search = params.search;
  }

  if (params.limit) {
    res.limit = parseInt(params.limit, 10) || 10;
  }

  if (params.skip) {
    res.skip = parseInt(params.skip, 10) || 0;
  }

  if (params.sort) {
    // Split the sort parameter into column and direction
    const [column, direction] = params.sort.split(':');

    // Validate and set sorting direction
    if (column && (direction === 'asc' || direction === 'desc')) {
      res.sort = {
        key: column,
        dir: direction === 'asc' ? 1 : -1,
      }
    }
  }

  return res;
}

const productsGetHandler = async (req: Request<{}, {}, {}, ProductQueryParams>, res: Response) => {
  const { query } = req;

  const options = parseQueryParams(query);
  const productsResult = await req.dataSources?.products.getProducts(options);
  if (productsResult) {
    const totalItems = productsResult[1];
    const totalPages = Math.ceil(totalItems / (options.limit || 1));
    res.status(200).send({ data: productsResult[0], pagination: {
      totalItems,
      totalPages,
    } });
  }
}

const productsPostHandler = async (req: Request, res: Response) => {
  try {
    const value = await ProductValidator.validateAsync(req.body.product);
    const product = await req.dataSources?.products.createProduct(value);
    res.status(200).send({ data: product });
  }
  catch (err) { 
    res.status(400).send();
  }
}

const productGetHandler = async (req: Request, res: Response) => {
  try {
    const product = await req.dataSources?.products.getProductById(new ObjectId(req.params.productId));
    res.status(200).send({ data: product });
  }
  catch (err) { 
    res.status(400).send();
  }
}

const productsPatchHandler = async (req: Request, res: Response) => {
  // TODO: implement this
  res.status(200).send('ok');
}

const productsDeleteHandler = async (req: Request, res: Response) => {
  // TODO: implement this
  res.status(200).send('ok');
}

export {
  productsGetHandler,
  productGetHandler,
  productsPostHandler,
  productsPatchHandler,
  productsDeleteHandler,
}
