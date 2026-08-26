import { Logger } from "../helpers/Logger.js";

const inlineQueryEvent = {
  type: "inline_query",
  execute: async (ctx, bot) => {
    if (!ctx.inlineQuery) return;

    const query = ctx.inlineQuery.query;
    const isSearch = query.toLowerCase().startsWith("search ");
    const searchTerm = isSearch ? query.slice(7).trim() : query.trim();

    if (!searchTerm) {
      await ctx.answerInlineQuery([], {
        button: {
          text: "Type something to search!",
          start_parameter: "help"
        },
        cache_time: 0
      });
      return;
    }

    const results = [
      {
        type: "article",
        id: `result_${Date.now()}`,
        title: `Search result for: ${searchTerm}`,
        description: "Click here to send this result",
        input_message_content: {
          message_text: `I searched for *${searchTerm}* via Inline Query!`,
          parse_mode: "Markdown"
        }
      }
    ];

    await ctx.answerInlineQuery(results, {
      cache_time: 10,
      is_personal: false
    });

    Logger.debug(`[InlineQuery] Processed query: "${query}"`);
  },
};

export default inlineQueryEvent;
