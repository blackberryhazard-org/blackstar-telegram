import { Scenes } from "telegraf-hardened";

/**
 * A basic 3-step wizard scene that asks for a name and age.
 */
const exampleWizard = new Scenes.WizardScene(
  "EXAMPLE_WIZARD",
  // Step 1: Ask for name
  async (ctx) => {
    await ctx.reply("Welcome to the Example Wizard! What is your name?");
    return ctx.wizard.next();
  },
  // Step 2: Validate name, ask for age
  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply("Please send a text message with your name.");
      return; // Keep them in this step
    }

    ctx.session.name = ctx.message.text;

    await ctx.reply(`Nice to meet you, ${ctx.session.name}! How old are you?`);
    return ctx.wizard.next();
  },
  // Step 3: Validate age, finish
  async (ctx) => {
    if (!ctx.message || !("text" in ctx.message)) {
      await ctx.reply("Please send a valid number for your age.");
      return;
    }

    const age = parseInt(ctx.message.text, 10);
    if (isNaN(age)) {
      await ctx.reply("That doesn't look like a number! Try again.");
      return;
    }

    await ctx.reply(
      `Awesome! You are ${ctx.session.name} and you are ${age} years old. Exiting wizard.`
    );
    return ctx.scene.leave();
  }
);

export default exampleWizard;
