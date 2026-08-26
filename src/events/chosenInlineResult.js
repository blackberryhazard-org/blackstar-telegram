import { Logger } from "../helpers/Logger.js";

const chosenInlineResultEvent = {
  type: "chosen_inline_result",
  execute: async (ctx, bot) => {
    if (!ctx.chosenInlineResult) return;

    const resultId = ctx.chosenInlineResult.result_id;
    const query = ctx.chosenInlineResult.query;

    Logger.info(`[ChosenResult] User selected result [${resultId}] for query [${query}]`);
  },
};

export default chosenInlineResultEvent;
