//user claims.
//admin can delete and do eveything else.
//manager can create loan, update loan, and get loans
//office can get loans, cannot create loan.
export interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "officer">;
    allowSameUser?: boolean;
}