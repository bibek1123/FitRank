import './src/config/env.js';
import "./src/config/db.js";
import express from 'express';
import cors from 'cors';
import * as util from "./src/utils/messages.js";
import logger from './src/middlewares/logger.js'
import indexRoutes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000

globalThis.util = util;
globalThis.logger = logger;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', indexRoutes);

// Health Check
app.get("/", (req, res) => {
  logger.info("FitRank Server Running");
  res.json({ message: "FitRank Server Running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
