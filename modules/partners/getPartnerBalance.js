import signIn from "../signIn.js";

async function getPartnerBalance(pid, pname) {
  let malumot = [];

  async function setInfo(info, pname) {
    malumot.push(info.result);
    const lastOp = malumot[0][malumot[0].length - 1];

    const cdate = lastOp.date;
    const update = new Date(cdate * 1000);

    const start = +lastOp.start_amount;
    const currency = +lastOp.currency_amount;
    const docType = lastOp.document_type.name;

    let natija = 0;

    if (lastOp.document_type.id === 1) {
      natija = start - currency;
    } else if (lastOp.document_type.id === 5) {
      natija = start + currency;
    }

    let berilgan = lastOp.currency_amount.toLocaleString("uz-UZ");
    let formattedNumber = natija.toLocaleString("uz-UZ");
    const parnerName = pname;
    const msgs = `Наименование: <b>${parnerName}</b>\nТип документа: <b>${docType}</b>\nДата: <b>${update.toLocaleString(
      "uz-UZ"
    )}</b>\n\nСумма: <b>${berilgan}</b>\n\nОстатка: <b>${formattedNumber}</b>`;

    return msgs;
  }

  async function getBalance(pid, pname) {
    const date = new Date();
    const timeNow = Math.floor(date.getTime() / 1000);
    const partnerId = +pid;
    const requestData = {
      start_date: 1684818125,
      end_date: timeNow,
      partner_id: partnerId,
    };
    const request = "PartnerBalance/get";
    const data = await signIn(request, requestData);
    return setInfo(data, pname);
  }

  const natija = await getBalance(pid, pname);

  // console.log(natija)
  return natija;
}

export default getPartnerBalance;
