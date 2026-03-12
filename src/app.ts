import express, { Express } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";
import morgan from "morgan";

//Initialize Express application.
const app: Express = express();

//global middleware.
app.use(express.json());
app.use((morgan("combined")));

//router handler for tickets.
app.use("/api/v1", loanRoutes);

export default app;