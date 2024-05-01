import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
    getHealth(): any {
        try {
            console.log(`[HEALTH CHECK] OK!`);
            return { status: "SUCCESS", message: "Ok!" };
        } catch (error) {
            return {
                status: "FAILURE",
                errorDescription: `${JSON.stringify(error)}`,
            };
        }
    }
}
