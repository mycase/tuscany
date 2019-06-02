import generateHelperSourceCode from './url_helper_generator';
import SourceFileSystem from './fs';
import parseRoutes from './parse_routes';

async function generateRouteModules(routesLocation: string, sourceDirectory: string) {
  console.log(`Parsing routes at ${routesLocation}`);
  const routesConfig = parseRoutes(routesLocation);
  const sfs = new SourceFileSystem(sourceDirectory);

  console.log(`Preparing helpers directory ${sourceDirectory}`);
  await sfs.initializeHelpersDirectory();

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

export { generateRouteModules };

export { generateFormatAndQuery } from './url_helper_utils';
