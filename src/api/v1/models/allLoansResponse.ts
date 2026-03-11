import { loanApplicant } from "./loanApplication";

export interface AllLoansResponse{
    message: string,
    count: number,
    allLoans: loanApplicant[];
}