"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var route_generation_1 = require("./route_generation");
var fs_1 = require("./fs");
var argv = yargs
    .usage('Usage: $0 -d [folder] -r [routes_json]')
    .demand(['d', 'r'])
    .string(['d', 'r'])
    .alias('d', 'directory')
    .alias('r', 'routes')
    .argv;
console.log("Generating routes in folder " + argv.directory);
var routesJSON = JSON.parse(argv.routes);
var rfs = new fs_1.default(argv.directory);
Object.keys(routesJSON).forEach(function (controllerKey) {
    Object.keys(routesJSON[controllerKey]).forEach(function (routeKey) {
        var _a = routesJSON[controllerKey][routeKey], path = _a.path, req = _a.req;
        var routeSource = route_generation_1.default(path, req);
        rfs.addRouteScript(controllerKey, routeKey, routeSource);
    });
});
