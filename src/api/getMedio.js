import { appFetch } from './fetch';
import host from './host';
import { encryptPayload } from './crypto'

export const getMedioPago = async (contrato) => {
    //console.log(contrato)
    const url = `${host.backURL}/v1/pagos/consultarMedioPago`;
    return await appFetch({ url, auth:localStorage.getItem('authorization') , body: JSON.stringify(await encryptPayload({numeroContrato: contrato})), method: 'POST' });
};