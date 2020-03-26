import Crypto from 'crypto-js';

import { SunmiAPIModels } from './models';

export function generateSignString(body: SunmiAPIModels.Request.BaseAuth, keyAuth: SunmiAPIModels.Request.KeyAuth) {
    const stringList: string[] = [];
    for (const key in body) {
        const value = (body as any)[key];
        if (key === 'sign' || !value) {
            continue;
        }
        const newString = `${key}=${value}`;
        stringList.push(newString);
    }
    const signToken = stringList.sort().join('&');
    const finalTokenString = `${signToken}&key=${keyAuth.key}`;
    const hash = Crypto.MD5(finalTokenString).toString().toUpperCase();
    return hash;
}