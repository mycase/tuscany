import * as yargs from 'yargs';
import { generateRouteModules } from '..';

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
  await generateRouteModules(routesLocation, sourceDirectory);
}

export { main };
