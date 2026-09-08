import { Logger } from "../../utils/Logger.js";

const worldButton = {
  name: "🌴 World",
  execute: async (ctx) => {
    Logger.debug("User pressed World button");
    await ctx.reply("You pressed World!");
  },
};

export default worldButton;
