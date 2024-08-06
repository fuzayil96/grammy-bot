import signIn from '../signIn.js'

async function getItemQuantity(id) {
  let itemId = +id
  const requestData = {
    item_ids: [itemId],
    stock_ids: [1, 2, 3, 4],
  }
  let sklad = []
  const request = 'Item/getCurrentQuantity'

  const itemQuantity = await signIn(request, requestData)

  const data = itemQuantity.result
  data.map((item) => {
    if (item.stock_id == '1') {
      sklad.push({ sklad: 'Марҳабо', soni: item.quantity })
    } else if (item.stock_id == '2') {
      sklad.push({ sklad: 'Вокзал', soni: item.quantity })
    } else if (item.stock_id == '3') {
      sklad.push({ sklad: 'Истиқлол', soni: item.quantity })
    } else if (item.stock_id == '4') {
      sklad.push({ sklad: 'Победа', soni: item.quantity })
    }
  })
  return sklad
}

export default getItemQuantity
