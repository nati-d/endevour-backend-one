class ErrorResponse {
    private readonly code: number;
    private readonly description?: string;
    private readonly details?: any;

    constructor(code: number, description?: string, details?: any) {
        this.code = code;
        this.description = description;
        this.details = details;
    }

    public getCode(): number {
        return this.code;
    }

    public getDescription(): any {
        return this.description;
    }

    public getDetails(): any {
        return this.details;
    }
}

export default ErrorResponse;
