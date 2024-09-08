import { Bot, InlineKeyboard } from "grammy";
import getItem from "./modules/items/getItem.js";
import getPartner from "./modules/partners/getPartner.js";
import getPartnerBalance from "./modules/partners/getPartnerBalance.js";
import { Menu } from "@grammyjs/menu";
import "dotenv/config";

const bot = new Bot(process.env.TOKEN);
const chatID = "-1002148605315";

let pkeyboard = [];

bot.use(async (ctx, next) => {
  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    await ctx.reply("Not allowed⛔");
    return;
  }
  await next();
});

bot.command("start", (ctx) => {
  bot.api.sendMessage(chatID, "Контрагенты тугмасини босинг!", {
    reply_markup: {
      keyboard: [[{ text: "Контрагенты" }]],
      resize_keyboard: true,
    },
  });
});

async function addData(pgroupid) {
  let partners = await getPartner(pgroupid);
  pkeyboard = [];

  // partners.sort((a, b) => a.text.localeCompare(b.text))

  for (let p of partners) {
    pkeyboard.push({ name: p.name, id: p.id });
  }
  return partners;
}

const main = new Menu("root-menu")
  .submenu("Нақт", "naqd", (ctx) => {
    ctx.editMessageText("Нақт");
  })
  .row()
  .submenu("Перичисление", "perichislenie", (ctx) =>
    ctx.editMessageText("Перичисление")
  );

function btn(key, callbackKey) {
  const button = new InlineKeyboard().text(key, callbackKey);
  return { reply_markup: button };
}
bot.use(main);

// bu naqd knopkasi

let naqd;
addData(1)
  .then(() => {
    naqd = new Menu("naqd");

    pkeyboard.forEach((item) => {
      naqd
        .text(item.name, async (ctx) => {
          const balance = await getPartnerBalance(item.id, item.name);
          ctx.editMessageText(balance, {
            parse_mode: "HTML",
            ...btn("⬅️ Орқага", "main-menu"),
          });
        })
        .row();
    });
    naqd.back("⬅️ Орқага", (ctx) => ctx.editMessageText("Тўлов тури:"));
    main.register(naqd);
  })
  .catch((err) => {
    console.log("xato");
  });

// bu perichisleniya knopkasi
let perichislenie;
addData(11)
  .then(() => {
    perichislenie = new Menu("perichislenie");

    pkeyboard.forEach((item) => {
      perichislenie
        .text(item.name, async (ctx) => {
          const balance = await getPartnerBalance(item.id, item.name);
          ctx.editMessageText(balance, {
            parse_mode: "HTML",
            ...btn("⬅️ Орқага", "perichislenie-menu"),
          });
        })
        .row();
    });
    perichislenie.back("⬅️ Орқага", (ctx) =>
      ctx.editMessageText("Тўлов тури:")
    );
    main.register(perichislenie);
  })
  .catch((err) => {
    console.log("xato");
  });

bot.on("callback_query:data", async (ctx) => {
  // console.log(orqa)
  if (ctx.callbackQuery.data == "main-menu") {
    await ctx.editMessageText("Нақт:", { reply_markup: naqd });
  } else if (ctx.callbackQuery.data == "perichislenie-menu") {
    await ctx.editMessageText("Нақт:", { reply_markup: perichislenie });
  }
});

bot.on("message", async (ctx, next) => {
  const regex = /^\d+$/;
  if (ctx.message.text == "Контрагенты") {
    await ctx.reply("<b>Тўлов тури:</b>", {
      reply_markup: main,
      parse_mode: "HTML",
    });
  } else if (
    ctx.message.text !== "Контрагенты" &&
    regex.test(ctx.message.text) &&
    ctx.message.text.length <= 4
  ) {
    getItem(ctx)
      .then((data) => {
        bot.api.sendMessage(ctx.chat.id, data, {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "HTML",
        });
      })
      .catch((err) => {
        bot.api.sendMessage(
          ctx.chat.id,
          "Сиз мавжуд бўлмаган кодни киритдингиз."
        );
      });
  } else {
    return;
    // bot.api.sendMessage(ctx.chat.id, 'Сиз мавжуд бўлмаган кодни киритдингиз.')
  }
});

/*

async function addData() {
  let partners = await getPartner()
  pkeyboard = []

  // partners.sort((a, b) => a.text.localeCompare(b.text))

  for (let p of partners) {
    pkeyboard.push({ name: p.name, id: p.id })
  }
  return partners
}

const naqd = new InlineKeyboard()

addData().then(() => {
  pkeyboard.forEach((tugma) => {
    naqd.text(tugma.name, tugma.id).row()
  })
  naqd.text('🔙Orqaga', 'mainMenu')
  return naqd
})

const maniMenu = new InlineKeyboard()
  .text('Нақд', '1')
  .row()
  .text('Перичисление', '11')

bot.on('callback_query', async (ctx) => {
  await ctx.answerCallbackQuery()

  if (ctx.callbackQuery.data === '11') {
    ctx.editMessageText('Перичисление', { reply_markup: naqd })
  } else if (ctx.callbackQuery.data === 'mainMenu') {
    ctx.editMessageText('Тўлов усули', { reply_markup: maniMenu })
  }
})
  */

bot.start();
