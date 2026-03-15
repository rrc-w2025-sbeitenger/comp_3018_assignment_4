import express, { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import {
     getHealthCheck,
      getAllLoans,
       getLoanById,
        createLoan,
         updateLoan,
          deleteLoan
         } from "../controllers/loanController";

const router:Router = express.Router();

router.get("/health", getHealthCheck);

//autheticate check if token is valid or not.
//isAuthorized checks if token contains the required role.
router.get("/loans", authenticate, isAuthorized({hasRole: ["admin", "manager", "officer"]}), getAllLoans);
router.get("/loans/:id", authenticate, isAuthorized({hasRole: ["admin", "manager", "officer"]}), getLoanById);
router.post("/loans", authenticate, isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}), createLoan);
router.put("/loans/:id", authenticate, isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}), updateLoan);
router.delete("/loans/:id", authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), deleteLoan);

export default router;