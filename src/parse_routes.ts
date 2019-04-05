import { readFileSync, existsSync } from 'fs';

type Route = string | { path: string, req: string[] };
interface Controller {
  [routeName: string]: Route;
}
export interface RoutesConfig {
  [controllerName: string]: Controller;
}

export default function parseRoutes(routesLocation: string): RoutesConfig {
  if (!existsSync(routesLocation)) {
    throw Error(`${routesLocation} does not exist`);
  }

  const fileContents = readFileSync(routesLocation);
  const routeJSON = JSON.parse(fileContents.toString());

  return routeJSON;
}
