import * as fs from 'fs';

export function mkdir(path: string): Promise<undefined> {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) { reject(err); } else { resolve(); }
    });
  });
}

export function writeFile(path: string, data: string): Promise<undefined> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) { reject(err); } else { resolve(); }
    });
  });
}
