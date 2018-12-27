import * as yargs from 'yargs';

const argv = yargs
  .usage('Usage: $0 -d [folder] -r [routes_json]')
  .demand(['d', 'r'])
  .string(['d', 'r'])
  .alias('d', 'directory')
  .alias('r', 'routes')
  .argv;

const routesJSON = JSON.parse(argv.routes as string);

console.log(argv.routes, argv.directory);
