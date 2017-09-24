const express = require("express");
const expressGraphQL = require("express-graphql");
const cors = require("cors");
const app = express();

// --------------------
// MIDDLEWARES
// -------------------
app.use(cors());

const { Tasks } = require("./schema");
app.use("/graphql", expressGraphQL({
	schema: Tasks,
  graphiql: true
}));

// --------------------
// REQUESTS : GET
// --------------------
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// --------------------
// LISTENER
// --------------------
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "192.168.0.100";
app.listen(PORT, HOST, 300, () => {
  console.log(`----------\nPORT: ${PORT}\nHOST: ${HOST}\n----------`)
});
