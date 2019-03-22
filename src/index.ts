import * as yargs from 'yargs';
import generateRouteScript from './route_generation';
import RouteFileSystem from './fs';
import * as fs from 'fs';

const argv = yargs
  .usage('Usage: $0 -d [folder] -r [routes_json]')
  .demand(['d', 'r'])
  .string(['d', 'r'])
  .alias('d', 'directory')
  .alias('r', 'routes')
  .argv;

console.log(`Generating routes in folder ${argv.directory}`);

const routesJSON = JSON.parse(fs.readFileSync(argv.routes as string).toString());
const rfs = new RouteFileSystem(argv.directory as string);

Object.keys(routesJSON).forEach((controllerKey) => {
  Object.keys(routesJSON[controllerKey]).forEach((routeKey) => {
    const route = routesJSON[controllerKey][routeKey];

    let path, req;
    if (typeof route === 'string') {
      path = route;
      req = [];
    } else {
      path = route.path;
      req = route.req;
    }

    const routeSource = generateRouteScript(path, req);
    rfs.addRouteScript(controllerKey, routeKey, routeSource);
  });
});
