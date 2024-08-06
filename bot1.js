import { Bot, InlineKeyboard } from 'grammy'
import getItem from './modules/items/getItem.js'
import getPartner from './modules/partners/getPartner.js'

const bot = new Bot('6840461223:AAFlI98DMdKWA_5L7-9JTmgWTiPYqTmAr4c')

let pkeyboard = []

bot.command('start', (ctx) => {
  bot.api.sendMessage(ctx.chat.id, 'Ассаламу Алайкум!', {
    reply_markup: {
      keyboard: [[{ text: 'Контрагенты' }]],
      resize_keyboard: true,
    },
  })
})

async function addData() {
  let partners = await getPartner()
  pkeyboard = []

  // partners.sort((a, b) => a.text.localeCompare(b.text))

  for (let p of partners) {
    pkeyboard.push([{ text: p.name, callback_data: p.id }])
  }
}

bot.command('partner', async (ctx) => {
  // let partners = await getPartner()

  // async function addData() {
  //   pkeyboard = []

  //   // partners.sort((a, b) => a.text.localeCompare(b.text))

  //   for (let p of partners) {
  //     pkeyboard.push([{ text: p.name, callback_data: p.id }])
  //   }
  // }

  //  partners.map((p) => {
  //   pkeyboard.push([{ text: p.name, callback_data: p.id }])
  // })

  addData().then(() => {
    bot.api.sendMessage(ctx.chat.id, 'Partners', {
      reply_markup: {
        inline_keyboard: pkeyboard,
      },
    })
  })
})

bot.on('callback_query:data', async (ctx) => {
  await ctx.answerCallbackQuery()
  console.log(ctx.callbackQuery.data)
})

bot.on('message', (ctx) => {
  const regex = /^\d+$/
  if (ctx.message.text !== 'Контрагенты' && regex.test(ctx.message.text)) {
    getItem(ctx)
      .then((data) => {
        bot.api.sendMessage(ctx.chat.id, data, { parse_mode: 'HTML' })
      })
      .catch((err) => {
        bot.api.sendMessage(
          ctx.chat.id,
          'Сиз мавжуд бўлмаган кодни киритдингиз.'
        )
      })
  } else if (ctx.message.text == 'Контрагенты') {
    addData().then(() => {
      bot.api.sendMessage(ctx.chat.id, 'Контрагенты', {
        reply_markup: {
          inline_keyboard: pkeyboard,
        },
      })
    })
  } else {
    bot.api.sendMessage(ctx.chat.id, 'Сиз мавжуд бўлмаган кодни киритдингиз.')
  }
  getPartner()
})

bot.start()

// let numbers = []

// let datas = ['bir', 'ikki']

// function addData() {
//   datas.map((d) => {
//     numbers.push(d)
//   })
// }
// addData()
// console.log(numbers)
