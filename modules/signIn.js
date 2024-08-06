import axios from 'axios'

async function signIn(request, requestData) {
  const key = {
    appToken: 'a96743133d8f4137ab4372e8f723c39b',
    appKey: '0a3f666411c7cfe714b98e484a777024',
    apiLogin: 'DB300039-BWDTRZ',
    sessionId: '4c89d319141c47a18f348fb85b906757',
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
