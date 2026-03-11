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
        updateLoanService
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
    const loanId: number = Number(req.params.id);

    //! change later
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
    const name: string = req.body.name;
    const number: number = req.body.number;
    const status: string = req.body.status;
    const createdAt: string = req.body.createdAt;

    //! add validation later.
    const newLoan: loanApplicant = createLoanService(id, name, number, status, createdAt);
    res.status(HTTP_STATUS.OK).json(newLoan);
}

export const updateLoan = (req: Request, res: Response): void => {
    const selectedLoanId: number = Number(req.params.id);

    //! change later!
    if(isNaN(selectedLoanId) || selectedLoanId <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Bad Request."});
        return;   
    };

    const id: number = Number(req.body.id);
    const name: string = req.body.name;
    const amount: number = Number(req.body.name);
    const status: string = req.body.status;
    const createdAt: string = req.body.createdAt;

    const updatedLoan: loanApplicant | false =  updateLoanService(selectedLoanId, id, name, amount, status, createdAt);

    //! change later!
    if(updatedLoan === false){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(updatedLoan);
    }
}

export const deleteLoan = (req:Request, res:Response): void => {
    res.status(HTTP_STATUS.OK).json("delete a laon");
}