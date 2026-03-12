import request from "supertest";
import app from "../src/app";

describe("Loan Application Endpoints", () => {
    describe("GET /api/v1/loans", () => {
        it("should return 200 with all loans and a count", async () => {
            const response = await request(app).get("/api/v1/loans");

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Loan applications retrieved");
            expect(response.body).toHaveProperty("count");
            expect(response.body).toHaveProperty("allLoans");
            expect(Array.isArray(response.body.allLoans)).toBe(true);
        });
    });

    describe("GET /api/loans/:id", () => {
        it("should return 200 with a loan when given a valid id", async () => {
            const response = await request(app).get("/api/v1/loans/1");

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", 1);
        });

        it("should return 404 when loan is not found", async () => {
            const response = await request(app).get("/api/v1/loans/9999");

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Not Found.");
        });

        it("should return 400 when id is invalid", async () => {
            const response = await request(app).get("/api/v1/loans/abc");

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Bad Request.");
        });
    });

    describe("POST /api/v1/loans", () => {
        it("should return 200 and the created loan", async () => {
            const newLoan = {
                id: 99,
                name: "Jane Doe",
                number: 15000,
                status: "pending",
                createdAt: "2026-01-01"
            };

            const response = await request(app).post("/api/v1/loans").send(newLoan);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", 99);
            expect(response.body).toHaveProperty("applicant", "Jane Doe");
        });
    });

    describe("PUT /api/v1loans/:id", () => {
        it("should return 200 with the updated loan", async () => {
            const updatedLoan = {
                id: 1,
                name: "Updated Name",
                amount: 20000,
                status: "approved",
                createdAt: "2026-01-01"
            };

            const response = await request(app).put("/api/v1/loans/1").send(updatedLoan);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("applicant", "Updated Name");
        });

        it("should return 404 when loan to update is not found", async () => {
            const response = await request(app).put("/api/v1/loans/9999").send({
                id: 9999,
                name: "Ghost",
                amount: 0,
                status: "pending",
                createdAt: "2026-01-01"
            });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Not Found.");
        });

        it("should return 400 when id is invalid", async () => {
            const response = await request(app).put("/api/v1/loans/abc").send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Bad Request.");
        });
    });

    describe("DELETE /api/v1/loans/:id", () => {
        it("should return 200 with the deleted loan", async () => {
            const response = await request(app).delete("/api/v1/loans/1");

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", 1);
        });

        it("should return 404 when loan to delete is not found", async () => {
            const response = await request(app).delete("/api/v1/loans/9999");

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Not Found.");
        });

        it("should return 400 when id is invalid", async () => {
            const response = await request(app).delete("/api/v1/loans/abc");

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Bad Request.");
        });
    });
});