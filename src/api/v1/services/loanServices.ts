import { HealthCheckResponse } from "../models/healthCheckResponse";
//import { AllLoansResponse } from "../models/allLoansResponse";
//import { loanApplicantData } from "src/data/data";
import { HTTP_STATUS } from "src/constants/httpConstant";

export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}