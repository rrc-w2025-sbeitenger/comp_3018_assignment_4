import express, { Express } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes";
import morgan from "morgan";
import adminRoutes from "./api/v1/routes/adminRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import {
    accessLogger,
     errorLogger,
      consoleLogger,
} from "./api/v1/middleware/logger";


//Initialize Express application.
const app: Express = express();

//Logging middleware (should be applied early in the middleware stack).
//Everything before routes is interspecting request.
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    //In development, log to console for immediate feedback
    app.use(consoleLogger);
}

//global middleware.
app.use(express.json());
app.use((morgan("combined")));

//router handler for tickets.
app.use("/api/v1", loanRoutes);
app.use("/api/v1", adminRoutes);

//Global error handling middleware (MUST be applied last).
//Everything after routes is interspecting response.
app.use(errorHandler);

export default app;