import signIn from '../signIn.js'
import getItemPrice from './getItemPrice.js'
import getItemQuantity from './getItemQuantity.js'

async function getItem(ctx) {
  const request = 'Item/get'

  let itemCode = +ctx.message.text
  const requestData = {
    codes: [itemCode],
  }

  //   Mahsulot kodini jo'natganda Kodi IDsi va nomi qaytariladi
  const itemData = await signIn(request, requestData)
  const codeItem = itemData.result[0].code
  const itemName = itemData.result[0].name
  const itemId = itemData.result[0].id

  //   Mahsulot IDsi jo'natiladi va mahsulot narxi olinadi
  const itemPrice = await getItemPrice(itemId)

  // Mahsulot IDsi jo'natiladi va mahsulotlarning do'konlardagi qoldig'i olinadi
  const itemQuantity = await getItemQuantity(itemId)
  //   kelgan ma'lumot jamlanadi
  const natija = itemQuantity.map((item) => {
    return `${item.sklad}: <b>${item.soni}</b> шт`
  })

  const message = `Код: <b>${codeItem}</b> \nНаименование: <b>${itemName}</b> \nЦена: <b>${itemPrice}</b>\n\n${natija.join(
    '\n'
  )}`

  return message
}

export default getItem
