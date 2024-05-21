const axios = require("axios");

async function getPartnerBalance(ctx) {
  let malumot = [];

  function setInfo(info) {
    malumot.push(info.result);
    const lastOp = malumot[0][malumot[0].length - 1];

    const cdate = lastOp.date;
    const update = new Date(cdate * 1000);

    const start = +lastOp.start_amount;
    const currency = +lastOp.currency_amount;

    let natija = 0;

    if (lastOp.document_type.id === 1) {
      natija = start - currency;
    } else if (lastOp.document_type.id === 5) {
      natija = start + currency;
    }

    let berilgan = lastOp.currency_amount.toLocaleString("uz-UZ");
    let formattedNumber = natija.toLocaleString("uz-UZ");
    const msgs = `pul ${berilgan}
    ostatka: ${formattedNumber}
    date: ${update.toLocaleString()}`;

    return msgs;
  }

  async function getBalance(ctx) {
    const date = new Date();
    const timeNow = Math.floor(date.getTime() / 1000);

    const pid = +ctx.callbackQuery.data;
    const requestData = {
      start_date: 1713479835,
      end_date: timeNow,
      partner_id: pid,
    };

    const appToken = "a96743133d8f4137ab4372e8f723c39b";
    const appKey = "0a3f666411c7cfe714b98e484a777024";
    const apiLogin = "DB300039-BWDTRZ";
    const sessionId = "4c89d319141c47a18f348fb85b906757";

    const request = "PartnerBalance/get";
    const mURL = `https://api.regos.uz/v1/${request}`;

    try {
      const response = await axios.post(mURL, requestData, {
        headers: {
          "Content-type": "application/json",
          ApiLogin: apiLogin,
          AppKey: appKey,
          Token: appToken,
          SessionID: sessionId,
        },
      });

      const data = response.data;
      return setInfo(data);
    } catch (error) {
      console.error("Avtorizatsiya jarayonida xato yuz berdi:", error);
      throw error; // Propagate the error so that the caller can handle it
    }
  }

  return await getBalance(ctx);
}

module.exports = { getPartnerBalance };
