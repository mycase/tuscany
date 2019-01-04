"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = require("path");
var RouteFileSystem = /** @class */ (function () {
    function RouteFileSystem(root) {
        if (!fs.existsSync(root)) {
            throw new Error("Routes folder `" + root + "` does not exist");
        }
        this.root = root;
    }
    RouteFileSystem.prototype.addRouteScript = function (controllerName, routeName, routeSource) {
        var controllerPath = path_1.join(this.root, controllerName);
        if (!fs.existsSync(controllerPath)) {
            fs.mkdirSync(controllerPath);
        }
        fs.writeFileSync(path_1.join(this.root, controllerName, routeName + ".ts"), routeSource);
    };
    return RouteFileSystem;
}());
exports.default = RouteFileSystem;
