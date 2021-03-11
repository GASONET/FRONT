import { appFetch } from './fetch';
import host from './host';
import { encryptPayload } from './crypto'

export const updateMedio = async (data) => {
    const url = `${host.backURL}/v1/pagos/modificarMedioPago`;
    return await appFetch({ url, auth:localStorage.getItem('authorization') , body: JSON.stringify(await encryptPayload(data)), method: 'POST' });
};