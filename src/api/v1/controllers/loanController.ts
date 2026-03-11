import { HTTP_STATUS } from "../../../constants/httpConstant";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { AllLoansResponse } from "../models/allLoansResponse";
import { Request, Response } from "express";
import { 
    getHealthStatusService,
     getAllLoansService
     } from "../services/loanServices";


export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(healthStatus);
}

export const getAllLoans = (req:Request, res:Response): void => {
    const allProjects: AllLoansResponse = getAllLoansService();
    res.status(HTTP_STATUS.OK).json(allProjects);
}

export const getLoanById = (req:Request, res:Response): void => {
    res.status(HTTP_STATUS.OK).json("get single loan!");
}

export const createLoan = (req:Request, res:Response): void => {
    res.status(HTTP_STATUS.OK).json("create a laon");
}

export const updateLoan = (req:Request, res:Response): void => {
    res.status(HTTP_STATUS.OK).json("update a laon");
}

export const deleteLoan = (req:Request, res:Response): void => {
    res.status(HTTP_STATUS.OK).json("delete a laon");
}