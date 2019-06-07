import * as fs from 'fs';
import { promisify } from 'util';

export const mkdir = promisify(fs.mkdir);
export const writeFile = promisify(fs.writeFile);

