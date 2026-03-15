import { HTTP_STATUS } from "../../../constants/httpConstant";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { AllLoansResponse } from "../models/allLoansResponse";
import { Request, Response } from "express";
import { loanApplicant } from "../models/loanApplication";
import { 
    getHealthStatusService,
     getAllLoansService,
      getLoanByIdService,
       createLoanService,
        updateLoanService,
         deleteLoanService
     } from "../services/loanServices";

//! no or minimal validation is added since that is not the focus of the application.
export const getHealthCheck = (req: Request, res: Response): void => {
    const healthStatus: HealthCheckResponse = getHealthStatusService();
    res.status(HTTP_STATUS.OK).json(healthStatus);
}

export const getAllLoans = (req:Request, res:Response): void => {
    const allProjects: AllLoansResponse = getAllLoansService();
    res.status(HTTP_STATUS.OK).json(allProjects);
}

export const getLoanById = (req:Request, res:Response): void => {
    const loanId: number = Number(req.params.id);

    if(isNaN(loanId) || loanId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;
    }

    const selectedProject: loanApplicant | undefined = getLoanByIdService(loanId);

    if(!selectedProject){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedProject);
    }
}

export const createLoan = (req: Request, res: Response): void => {
    const id: number = Number(req.body.id);
    const applicant: string = req.body.applicant;
    const amount: number = Number(req.body.amount);
    const status: string = req.body.status;
    const createdAt: string = req.body.createdAt;

    const newLoan: loanApplicant = createLoanService(id, applicant, amount, status, createdAt);
    res.status(HTTP_STATUS.CREATED).json(newLoan);
}

export const updateLoan = (req: Request, res: Response): void => {
    const selectedLoanId: number = Number(req.params.id);

    if(isNaN(selectedLoanId) || selectedLoanId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;   
    };

    const id: number = Number(req.body.id);
    const applicant: string = req.body.applicant;
    const amount: number = Number(req.body.amount);
    const status: string = req.body.status;
    const createdAt: string = req.body.createdAt;

    const updatedLoan: loanApplicant | false =  updateLoanService(selectedLoanId, id, applicant, amount, status, createdAt);

    if(updatedLoan === false){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(updatedLoan);
    }
}

export const deleteLoan = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);

    if(isNaN(id) || id <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;
    };

    const deletedLoan: loanApplicant | false = deleteLoanService(id); 
    if(deletedLoan === false){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    }

    res.status(HTTP_STATUS.OK).json(deletedLoan);
}