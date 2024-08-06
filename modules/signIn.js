import axios from 'axios'
import 'dotenv/config'

async function signIn(request, requestData) {
  const key = {
    appToken: process.env.APP_TOKEN,
    appKey: process.env.APP_KEY,
    apiLogin: process.env.API_LOGIN,
    sessionId: process.env.SESSION_ID,
  }

  const mURL = `https://api.regos.uz/v1/${request}`
  try {
    const response = await axios.post(mURL, requestData, {
      headers: {
        'Content-type': 'application/json',
        ApiLogin: key.apiLogin,
        AppKey: key.appKey,
        Token: key.appToken,
        SessionID: key.sessionId,
      },
    })
    const javob = response.data
    return javob
  } catch (error) {
    console.error('Avtorizatsiya jarayonida xato yuz berdi:', error)
    throw error // Propagate the error so that the caller can handle it
  }
}

export default signIn
