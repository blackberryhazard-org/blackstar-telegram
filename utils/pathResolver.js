import { glob } from "glob";
import { pathToFileURL } from "node:url";
import path from "node:path";

/**
 * Dynamically resolves file URLs for JS modules in a target directory (e.g. "plugins", "middleware/events").
 */
export async function resolveFiles(targetDir) {
  const cwd = process.cwd();
  const searchPattern = `${cwd}/${targetDir}/**/*.js`.replace(/\\/g, "/");
  const files = await glob(searchPattern);

  return files.map((file) => pathToFileURL(path.resolve(file)).toString());
}
