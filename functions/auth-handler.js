functions/auth-handler.js
// functions/auth-handler.js
const querystring = require("querystring");
const axios = require("axios");

exports.handler = async (event) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  // Step 1: If no ?code param, redirect to Google OAuth login
  if (!event.queryStringParameters.code) {
    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/spreadsheets"
    ].join(" ");

    const oauthURL = `https://accounts.google.com/o/oauth2/v2/auth?` + querystring.stringify({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope,
      access_type: "offline",
      prompt: "consent"
    });

    return {
      statusCode: 302,
      headers: {
        Location: oauthURL
      },
      body: ""
    };
  }

  // Step 2: If Google redirected back with ?code, exchange it for tokens
  const code = event.queryStringParameters.code;

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", querystring.stringify({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const tokens = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Authentication successful!",
        tokens
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message, details: err.response?.data })
    };
  }
};
