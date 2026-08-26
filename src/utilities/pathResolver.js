import { glob } from "glob";
import { pathToFileURL } from "node:url";
import path from "node:path";

/**
 * Dynamically resolves file URLs for JS modules in a target directory (e.g. "commands", "events").
 */
export async function resolveFiles(subDir) {
  const cwd = process.cwd();
  const searchPattern = `${cwd}/src/${subDir}/**/*.js`.replace(/\\/g, "/");
  const files = await glob(searchPattern);

  return files.map((file) => pathToFileURL(path.resolve(file)).toString());
}
