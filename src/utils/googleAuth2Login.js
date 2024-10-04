
import { google } from 'googleapis'

export const googleAuthProvider = () => {
   const oauth2client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
   )
   return oauth2client;
}

