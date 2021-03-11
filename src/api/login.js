import { appFetchLogin } from './fetch';
import host from './host';
import md5 from 'md5'
import { encryptPayload } from './crypto'

export const loginUser = async (username, password) => {
    const url = `${host.backURL}/v1/login`;
    return await appFetchLogin({ url, body: JSON.stringify(await encryptPayload({user: username, pwd: md5(password)})), method: 'POST' });
};