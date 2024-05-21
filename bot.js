const { Bot, InlineKeyboard } = require("grammy");
const { Menu } = require("@grammyjs/menu");
const { getPartnerBalance } = require("./modules/getPartnerBalance");

const bot = new Bot("7100127126:AAGiYjQ2MEIpW8-zKXXa6pgOygTB4VX1t2w");

const menu = new Menu("my-menu-identifier")
  .text("A", (ctx) => ctx.reply("You pressed A!"))
  .row()
  .text("B", (ctx) => ctx.reply("You pressed B!"));

bot.use(menu);

bot.command("start", async (ctx) => {
  // Send the menu.
  await ctx.reply("Check out this menu:", { reply_markup: menu });
});

bot.command("test", async (ctx) => {
  await bot.api.sendMessage(ctx.chat.id, "hello", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "сирож детский обувь", callback_data: "133" }],
        [{ text: "ЗОКИР АКА УРГУТ ", callback_data: "45" }],
        [{ text: "умар красовка", callback_data: "12" }],
        [{ text: "АВЗАЛШОХ СУМКА", callback_data: "28" }],
        [{ text: "кафтархона обувь", callback_data: "20" }],
      ],
    },
  });
});

bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery();
  // ctx.deleteMessage();
  // console.log(getPartnerBalance(ctx));
  getPartnerBalance(ctx)
    .then((data) => {
      const message = `${ctx.callbackQuery.text} ${data}`;
      bot.api.sendMessage(ctx.chat.id, message);
    })
    .catch((error) => {
      console.error(error); // Xato haqida xabar chiqaring
    });
  // getPartnerBalance(ctx);
  // bot.api.sendMessage(ctx.chat.id, msg);
});

bot.start();
