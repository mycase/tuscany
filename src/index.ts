import generateRouteSource from './route_generation/index';

console.log(generateRouteSource(process.argv[2], process.argv.slice(3)));