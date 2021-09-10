import { Request, Response, RequestHandler as Middleware } from 'express';

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch';

export type Handler = (req: Request, res: Response) => unknown;

export type Route = {
  version?: string;
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};
