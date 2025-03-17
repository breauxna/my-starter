import { NextFunction } from 'express';
import { DataSources } from '../datasources/types';

export function contextMiddleware({
  dataSources
}: {
  dataSources: DataSources;
}) {
  return (req: Express.Request, _: Express.Response, next: NextFunction) => {
    req.dataSources = dataSources;
    next();
  };
}
