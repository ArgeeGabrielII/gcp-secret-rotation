import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { GetSecretDto } from './dto/get-secret.dto';
import { UpdSecretDto } from './dto/upd-secret.dto';

@Injectable()
export class SecretManagerService {
    private readonly client = new SecretManagerServiceClient();

    // REQ: ["GCP_SECRET_NAME", ...]
    // RES: {"GCP_SECRET_NAME":"VALUE", ...}
    async getSecrets(getSecretDto: GetSecretDto) {
        const { names } = getSecretDto,
            secrets = {};
        await Promise.all(
            names.map(async (i) => {
                secrets[i] = await this.getSecret(i);
            }),
        );
        return secrets;
    }

    async insSecret(name: string) {
        const [secret] = await this.client.createSecret({
            parent: `projects/${process.env.GCP_PROJECT_ID}`,
            secretId: name,
            secret: {
                replication: {
                    automatic: {},
                },
            },
        });

        return secret.name;
    }

    async updSecret(name: string, updateSecretDto: UpdSecretDto) {
        const { secret_value } = updateSecretDto;

        const payload = Buffer.from(secret_value, 'utf-8');

        const [version] = await this.client.addSecretVersion({
            parent: `projects/${process.env.GCP_PROJECT_ID}/secrets/${name}`,
            payload: {
                data: payload,
            },
        });

        return version.name;
    }

    async getSecret(name: string): Promise<string> {
        const [secret] = await this.client.accessSecretVersion({
            name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${name}/versions/latest`,
        });
        console.log(`[SINGLE GET NAME] : ${name} [RESPONSE] : ${secret.payload.data}`);
        return secret.payload.data.toString();
    }
}
