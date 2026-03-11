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
    return{
        allLoans: loanApplicantData
    };
}

export const getLoanByIdService = (loanId:number): loanApplicant | undefined => {
    const loan: loanApplicant | undefined = loanApplicantData.find(x => x.id == loanId);
    return loan;
}