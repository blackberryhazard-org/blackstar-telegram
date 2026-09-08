import { resolveFiles } from "../utils/pathResolver.js";
import { Logger } from "../utils/Logger.js";

export const eventsMap = new Map();

export async function loadEvents(bot) {
  try {
    eventsMap.clear();
    const fileUrls = await resolveFiles("middleware/events");
    let count = 0;

    for (const fileUrl of fileUrls) {
      const module = await import(fileUrl);
      const event = module.default;

      if (!event || !event.type || event.disabled) {
        continue;
      }

      bot.on(event.type, async (ctx) => {
        try {
          await event.execute(ctx, bot);
        } catch (error) {
          Logger.error(`Error in event handler for type "${String(event.type)}":`, error);
        }
      });

      count++;
    }

    Logger.info(`[EventHandler] - Loaded ${count} event(s)`);
  } catch (error) {
    Logger.error("[EventHandler] - Error loading events:", error);
  }
}
