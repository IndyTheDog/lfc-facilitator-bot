import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT'],
};

app.use(cors(corsOptions));
app.use(helmet());
app.disable('x-powered-by');

const extended = process.env.NODE_ENV === 'test';
app.use(express.json());
app.use(express.urlencoded({ extended }));

routes.forEach((route) => {
  const { method, path, middleware, handler } = route;
  app[method](`${path}`, ...middleware, handler);
});

app.listen(PORT, () => {
  console.log(`Started Express at http://localhost:${PORT}`);
});

export default app;
