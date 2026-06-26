const express = require("express");
const app = express();
const routes = require("./routes/authRoutes");
const versionRoutes=require("./routes/versionRoutes");

app.use(express.json());
app.use("/api", routes);
app.use("/api",versionRoutes);

module.exports = app;