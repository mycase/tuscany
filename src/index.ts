import * as yargs from 'yargs';
import generateHelperSourceCode from './url_helper_generator';
import SourceFileSystem from './fs';
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
  const sourceDirectory = argv.directory as string;
  console.log(`Parsing routes at ${routesLocation}`);
  const routesConfig = parseRoutes(routesLocation);
  const sfs = new SourceFileSystem(sourceDirectory);

  console.log(`Clearing existing routes from folder ${sourceDirectory}`);
  await sfs.clearHelpersDirectory();

  console.log(`Generating routes from manifest into folder ${sourceDirectory}`);

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
          const helperSource = generateHelperSourceCode(routeInfo.path, routeInfo.req);
          return sfs.writeHelper(controllerName, routeName, helperSource);
        })
      )
    )
  );
}

main();
