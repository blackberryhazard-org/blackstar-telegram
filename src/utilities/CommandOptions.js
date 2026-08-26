import config from "../configs/config.js";
import { Logger } from "../helpers/Logger.js";

const cooldowns = new Map();

/**
 * Validates command options (guards, cooldowns, group/private checks).
 */
export async function checkCommandGuards(ctx, command, args) {
  const userId = ctx.from?.id ? String(ctx.from.id) : null;
  const chatType = ctx.chat?.type;
  const options = command.options || {};

  // 1. Check ownerOnly
  if ((command.ownerOnly || options.ownerOnly) && userId !== config.users.ownerId) {
    await ctx.reply(config.messages.NOT_BOT_OWNER);
    return false;
  }

  // 2. Check developerOnly
  if (
    (command.developerOnly || options.developerOnly) &&
    userId !== config.users.ownerId &&
    !config.users.developers.includes(userId || "")
  ) {
    await ctx.reply(config.messages.NOT_BOT_DEVELOPER);
    return false;
  }

  // 3. Check privateOnly
  if (options.privateOnly && chatType !== "private") {
    await ctx.reply(config.messages.PRIVATE_ONLY);
    return false;
  }

  // 4. Check groupOnly
  if (options.groupOnly && chatType !== "group" && chatType !== "supergroup") {
    await ctx.reply(config.messages.GROUP_ONLY);
    return false;
  }

  // 5. Check adminOnly
  if (options.adminOnly) {
    if (chatType !== "group" && chatType !== "supergroup") {
      await ctx.reply(config.messages.GROUP_ONLY);
      return false;
    }

    if (userId) {
      try {
        const member = await ctx.getChatMember(Number(userId));
        const isAdmin = ["administrator", "creator"].includes(member.status);

        if (!isAdmin) {
          await ctx.reply(config.messages.ADMIN_ONLY);
          return false;
        }
      } catch (err) {
        Logger.error(`Error checking group admin permissions for user ${userId}:`, err);
        await ctx.reply("⚠️ Unable to verify administrator permissions.");
        return false;
      }
    }
  }

  // 6. Check args requirement
  if (command.args && args.length === 0) {
    let replyMsg = config.messages.MISSING_ARGS;
    replyMsg = replyMsg.replace("%usage%", `/${command.name} ${command.usage || ""}`);
    replyMsg = replyMsg.replace("%example%", command.examples ? `/${command.name} ${command.examples[0]}` : "None");
    await ctx.reply(replyMsg);
    return false;
  }

  // 7. Check cooldown
  if (options.cooldown && userId) {
    const cooldownKey = `${command.name}:${userId}`;
    const now = Date.now();
    const cooldownAmount = options.cooldown * 1000;
    const expirationTime = cooldowns.get(cooldownKey) || 0;

    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
      await ctx.reply(config.messages.COOLDOWN.replace("%cooldown%", String(timeLeft)));
      return false;
    }

    cooldowns.set(cooldownKey, now + cooldownAmount);
    setTimeout(() => cooldowns.delete(cooldownKey), cooldownAmount);
  }

  return true;
}
