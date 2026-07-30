import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import benefitRouter from "./routes/benefitRouter.js";
import budgetRouter from "./routes/budgetRouter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/soldiers", benefitRouter);
app.use("/budget", budgetRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
