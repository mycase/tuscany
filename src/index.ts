import * as yargs from 'yargs';
import generateRouteSource from './route_generator';
import RouteFileSystem from './fs';
import parseRoutes from './parse_routes';

async function main() {
  const argv = yargs
    .usage('Usage: $0 -d [folder] -r [routes_json]')
    .demand(['d', 'r'])
    .string(['d', 'r'])
    .describe('d', 'Directory to output generated routes')
    .describe('r', 'Location of a JSON route manifest')
    .alias('d', 'directory')
    .alias('r', 'routes')
    .argv;

  const routesLocation = argv.routes as string;
  const routeDirectory = argv.directory as string;
  console.log(`Parsing routes at ${routesLocation}`);
  const routesConfig = parseRoutes(routesLocation);
  const rfs = new RouteFileSystem(routeDirectory);

  console.log(`Clearing existing routes from folder ${routeDirectory}`);
  await rfs.clearRoutesDirectory();

  console.log(`Generating routes from manifest into folder ${routeDirectory}`);

  await Promise.all(
    Object.keys(routesConfig).map(controllerName =>
      Promise.all(
        Object.keys(routesConfig[controllerName]).map((routeName) => {
          let routeInfo = routesConfig[controllerName][routeName];
          if (typeof routeInfo === 'string') {
            routeInfo = {
              path: routeInfo,
              req: [],
            };
          }
          const routeSource = generateRouteSource(routeInfo.path, routeInfo.req);
          return rfs.writeRoute(controllerName, routeName, routeSource);
        })
      )
    )
  );
}

main();
