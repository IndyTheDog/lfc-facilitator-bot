import { routes } from './routes';

test('all routes are valid', () => {
  const allRoutes = routes;
  expect(allRoutes).toBeDefined();
  expect(allRoutes.length).toEqual(1);
  allRoutes.forEach((route) => {
    expect(route.handler).toBeDefined();
    expect(route.method).toBeDefined();
    expect(route.path).toBeDefined();
  });
});
