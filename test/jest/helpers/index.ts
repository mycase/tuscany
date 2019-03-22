import * as path from 'path';

export function requireRoute(controllerName: string, routeName: string) {
  return require(
    path.resolve(
      __dirname,
      '..', // jest
      '..', // test
      'test_output',
      controllerName,
      routeName
    )
  ).default;
}
