import * as fs from 'fs';
import { join as pathJoin } from 'path';
import * as rimraf from 'rimraf';

export default class RouteFileSystem {
  private root: string;

  constructor(root: string) {
    if (!fs.existsSync(root)) {
      throw new Error(`Routes folder \`${root}\` does not exist`);
    }
    this.root = root;
  }

  clearRoutesDirectory() {
    rimraf.sync(pathJoin(this.root, '*'));
  }

  writeRoute(controllerName: string, routeName: string, routeSource: string) {
    const controllerPath = pathJoin(this.root, controllerName);
    if (!fs.existsSync(controllerPath)) {
      fs.mkdirSync(controllerPath);
    }

    fs.writeFileSync(pathJoin(this.root, controllerName, `${routeName}.ts`), routeSource);
  }
}
