const express = require("express");
const app = express();

// koneksi database
require("./src/config/db");

// routes
const routes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const versionRoutes = require("./src/routes/versionRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const approvalRoutes = require("./src/routes/approvalRoutes");
const historyRoutes = require("./src/routes/historyRoutes");
const dashboardRoutes=require("./src/routes/dashboardRoutes");

// middleware
app.use(express.json());

// routes
app.use("/api", routes);
app.use("/api", categoryRoutes);
app.use("/api", documentRoutes);
app.use("/api", versionRoutes);
app.use("/api",commentRoutes);
app.use("/api", approvalRoutes);
app.use("/api",historyRoutes);
app.use("/api",dashboardRoutes);

// test endpoint
app.get("/", (req, res) => {
  res.send("API jalan ");
});

// jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});