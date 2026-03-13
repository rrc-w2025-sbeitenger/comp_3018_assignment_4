import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
///import authenticate from "../middleware/authenticate";
//import isAuthorized from "../middleware/authorize";

const adminRoutes: express.Router = express.Router();

// Only admins can set custom claims
adminRoutes.post("/admin/setCustomClaims", authenticate, isAuthorized({hasRole: ["admin"], allowSameUser: true}), setCustomClaims);

export default adminRoutes;