const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const testAPIRouter = require("./routes/testAPI");


const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use("/testAPI", testAPIRouter);
app.use("/users", usersRouter);
app.use("/api", authRouter);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
