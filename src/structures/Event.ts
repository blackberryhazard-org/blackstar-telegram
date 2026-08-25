import { Telegraf } from "telegraf-hardened";
import { BotContext } from "./BotContext.js";
import { Update } from "telegraf-hardened/types";

export type EventFilter =
  | Parameters<Telegraf<BotContext>["on"]>[0]
  | ((update: Update) => boolean);

export interface Event {
  type: EventFilter | EventFilter[];
  disabled?: boolean;
  execute: (ctx: BotContext, bot: Telegraf<BotContext>) => Promise<void> | void;
}
