import { appFetchKeyStore } from './fetch';
import host from './host';

export const keystore = async () => {
    const url = `${host.authURL}/auth/v1/keystore/.well-known/jwks.json`;
    return await appFetchKeyStore({ url, method: 'GET' });
};

