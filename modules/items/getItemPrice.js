import axios from 'axios'
import signIn from '../signIn.js'

async function getItemPrice(id) {
  let itemId = +id
  const requestData = {
    // codes: [itemCode],
    item_ids: [itemId],
    // stock_ids: [1, 2, 3, 4],
    //   start_date: 1713479835,
    //   end_date: timeNow,
    //   partner_id: pid,
  }

  const request = 'ItemPrice/get'
  const itemPrice = await signIn(request, requestData)
  const priceItem = itemPrice.result[0].value.toLocaleString('uz-UZ')

  return priceItem
}

export default getItemPrice
