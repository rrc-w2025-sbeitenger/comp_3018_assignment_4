import { HealthCheckResponse } from "../models/healthCheckResponse";
import { AllLoansResponse } from "../models/allLoansResponse";
import { loanApplicantData } from "../../../data/data";
import { loanApplicant } from "../models/loanApplication";
import { HTTP_STATUS } from "../../../constants/httpConstant";

export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}

export const getAllLoansService = (): AllLoansResponse => {
    const count = loanApplicantData.length + 1;
    return{
        message: "Loan applications retrieved",
        count: count,
        allLoans: loanApplicantData
    };
}

export const getLoanByIdService = (loanId:number): loanApplicant | undefined => {
    const loan: loanApplicant | undefined = loanApplicantData.find(x => x.id == loanId);
    return loan;
}

export const createLoanService = (id:number, name:string, amount:number, status: string, createdAt:string): loanApplicant => {
    const newLoan: loanApplicant = {
        id: id ,
        applicant: name,
        amount: amount,
        status: status,
        createdAt: createdAt
    }

    loanApplicantData.push(newLoan);

    return newLoan;  

}

export const updateLoanService = (selectedId: number, id: number, name:string, amount: number, status: string, createdAt:string ): loanApplicant | false => {
    const applicantLoanIndex: number = loanApplicantData.findIndex(x => x.id === selectedId);
    //not in range of array.
    if(applicantLoanIndex === -1){
        return false;
    }

    const updatedApplicantLoan: loanApplicant = {
        id:id,
        applicant:name,
        amount: amount,
        status:status,
        createdAt:createdAt
    }

    loanApplicantData.splice(applicantLoanIndex, 1, updatedApplicantLoan);

    return updatedApplicantLoan;
}

export const deleteLoanService = (id:number): loanApplicant | false=> {
    const loanIndex: number = loanApplicantData.findIndex(x => x.id === id);
    //not in range of array.
    if(loanIndex === -1){
        return false;
    }

    //splice out the ticket without replacing it.
    const deletedLoan: loanApplicant[] = loanApplicantData.splice(loanIndex, 1);
    return deletedLoan[0];
    //return `Ticket: ${id} was removed!`;
}