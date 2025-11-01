exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const { username, password } = data;
  
    console.log("Login received:", username, password);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login saved" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  };
  