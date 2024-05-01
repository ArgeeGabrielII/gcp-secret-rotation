import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

@Injectable()
export class SecretManagerService {
    private readonly client = new SecretManagerServiceClient();

    // REQ: ["GCP_SECRET_NAME", ...]
    // RES: {"GCP_SECRET_NAME":"VALUE", ...}
    async getSecrets(secretNames: string[]) {
        const secrets = {};
        await Promise.all(
            secretNames.map(async (i) => {
                secrets[i] = await this.getSecret(i);
            }),
        );
        return secrets;
    }

    async getSecret(name: string): Promise<string> {
        const [secret] = await this.client.accessSecretVersion({
            name: `projects/${process.env.PROJECT_ID}/secrets/${name}/versions/latest`,
        });
        console.log(`[SINGLE GET NAME] : ${name} [RESPONSE] : ${secret.payload.data}`);
        return secret.payload.data.toString();
    }
}
