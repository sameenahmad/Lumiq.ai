const express = require("express");
const cors = require("cors");

const indexRouter = require("./main/routes/getHero");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 8000;
app.set("port", PORT);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
