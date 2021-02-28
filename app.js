var express = require("express");

var indexRouter = require("./main/routes/getHero");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 8000;
app.set("port", PORT);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
