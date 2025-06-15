functions/auth-handler.js
// functions/auth-handler.js
exports.handler = async function(event, context) {
  try {
    const { email, password } = JSON.parse(event.body);
    // Example logic — replace with Supabase or Firebase login
    if (email === "demo@example.com" && password === "123456") {
      return {
        statusCode: 200,
        body: JSON.stringify({ token: "fake-jwt-token" })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
