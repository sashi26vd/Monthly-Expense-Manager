functions/sheets-read.js
// functions/sheets-read.js
exports.handler = async function(event, context) {
  try {
    // Example: Read data from Google Sheets (you'll replace with real logic)
    const data = [
      { name: "John", amount: 100 },
      { name: "Jane", amount: 200 }
    ];
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
