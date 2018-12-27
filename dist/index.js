"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var argv = yargs
    .usage('Usage: $0 -d [folder] -r [routes_json]')
    .demand(['d', 'r'])
    .string(['d', 'r'])
    .alias('d', 'directory')
    .alias('r', 'routes')
    .argv;
var routesJSON = JSON.parse(argv.routes);
console.log(argv.routes, argv.directory);
