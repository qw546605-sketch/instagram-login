exports.handler = async (event) => {
    try {
      const data = JSON.parse(event.body);
      const { username, password } = data;
  
      console.log("Login received:", username, password);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Login received" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal error" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    }
  };
  