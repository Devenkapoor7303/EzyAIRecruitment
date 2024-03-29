import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthenticatedError";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
