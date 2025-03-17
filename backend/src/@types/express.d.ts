declare namespace Express {
  export interface Request {
    dataSources?: import('../datasources/types').DataSources;
  }
}
