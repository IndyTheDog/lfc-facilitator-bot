import { Route } from '../models/route';
import { command } from '../controllers/home/command';

export const routes: Route[] = [
  {
    method: 'post',
    path: '/slack/events',
    middleware: [],
    handler: command,
  },
];
