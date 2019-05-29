import { existsSync } from 'fs';
import { join as pathJoin } from 'path';
import * as rimraf from 'rimraf';
import * as fsUtil from './fs_utils';

export default class SourceFileSystem {
  private root: string;

  constructor(root: string) {
    if (!existsSync(root)) {
      throw new Error(`Routes folder \`${root}\` does not exist`);
    }
    this.root = root;
  }

  async clearHelpersDirectory() {
    return new Promise((resolve, reject) => {
      rimraf(pathJoin(this.root, '*'), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async writeHelper(controllerName: string, routeName: string, routeSource: string) {
    const controllerPath = pathJoin(this.root, controllerName);
    try {
      await fsUtil.mkdir(controllerPath);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    await fsUtil.writeFile(pathJoin(this.root, controllerName, `${routeName}.ts`), routeSource);
  }
}
