export interface JWTToken {
    token: string;
    status: TokenStatus;
}

export interface JWTVerify {
    valid: boolean;
    status: TokenStatus;
}

export enum TokenStatus {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}
