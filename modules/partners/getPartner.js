import signIn from '../signIn.js'

let pData = []

async function getPartner(pgroupid) {
  const requestData = {
    group_ids: [pgroupid],
  }
  //   postavshiki 1, perichislenie 11

  const request = 'Partner/get'
  const partners = await signIn(request, requestData)
  //   console.log(partners.result)
  const partner = partners.result

  async function addData() {
    // bu kod arrayga ma'lumot yozishdan avval uni tozalaydi
    pData = []
    // malumotlarni name bo'yicha alifbo tartibida joylaydi
    partner.sort((a, b) => a.name.localeCompare(b.name))

    for (let p of partner) {
      pData.push({ name: p.name, id: p.id })
    }
  }
  addData()
  //   partner.map((p) => {
  //     pData.push({ name: p.name, id: p.id })
  //   })
  return pData
}

export default getPartner
