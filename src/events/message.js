import { Logger } from "../helpers/Logger.js";

const event = {
  type: "message",
  execute: async (ctx, bot) => {
    if (!ctx.message || !("text" in ctx.message)) {
      return;
    }

    const text = ctx.message.text;
    Logger.debug(`[Message Event] Received text: ${text}`);
  },
};

export default event;
