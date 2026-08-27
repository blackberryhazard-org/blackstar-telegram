import { Scenes } from "telegraf-hardened";
import { resolveFiles } from "./pathResolver.js";
import { Logger } from "../helpers/Logger.js";

export const stage = new Scenes.Stage([]);

export async function loadScenes() {
  try {
    const fileUrls = await resolveFiles("scenes");
    let count = 0;

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const scene = module.default;

      if (!scene || !scene.id) {
        continue;
      }

      stage.register(scene);
      count++;
    }

    Logger.info(`[SceneHandler] - Loaded ${count} scene(s) into stage`);
  } catch (error) {
    Logger.error("[SceneHandler] - Error loading scenes:", error);
  }
}
