const express = require("express");

const app = express();

// set up port to listen on
app.set("port", process.env.PORT || 3000);

// Parse incoming post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
