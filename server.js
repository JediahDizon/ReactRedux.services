const express = require("express");
const expressGraphQL = require("express-graphql");
const app = express();

// --------------------
// MIDDLEWARES
// -------------------
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
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
