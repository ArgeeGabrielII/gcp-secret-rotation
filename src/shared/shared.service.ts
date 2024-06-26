import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    constructor() {}

    // Hasura Service
    async processGraphRequest(query: any) {
        try {
            const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': process.env.GRAPHQL_ENDPOINT_AUTH,
                },
                body: JSON.stringify({ query }),
            });
            return response.json();
        } catch (error) {
            return {
                status: 'FAILURE',
                errorDescription: `${JSON.stringify(error)}`,
            };
        }
    }
}
