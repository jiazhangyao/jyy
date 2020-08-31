
// import KJUR from "jsrsasign";

// const secret: string = "";
import { Base64 } from "js-base64";


/**
 * 判断obj
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isTrueObj(obj: any): boolean {
    return typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]";
}

/**
 * 获取时间字符串
 *
 * @export
 * @param {Date} date
 * @returns {string}
 */
export function getTimeString(date: Date): string {
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes();
}

/**
 * 生成随机字符串
 *
 * @export
 * @returns {string}
 */
export function randomString(): string {
    return Math.random().toString(36).slice(-8);
}

/**
 * 解析jwt字符串并返回payload中的sub
 *
 * @export
 * @param {string} jwtvalue
 * @returns {(object | string)}
 */
export function decodeJWTsub(jwtvalue: string): object | string {
    if (typeof jwtvalue === 'string') {
        const jwtArr: string[] = jwtvalue.split('.');
        if (jwtArr.length !== 3) {
            throw Error('this is not a jwt string');
        } else {
            try {
                const decodedPayload: JwtPayload = JSON.parse(Base64.decode(jwtArr[1]));
                if (!isTrueObj(decodedPayload.sub) && typeof decodedPayload.sub === 'string') {
                    try {
                        return JSON.parse(decodedPayload.sub);
                    } catch (e) {
                        console.warn('this sub is not a JSON string');
                        return decodedPayload.sub;
                    }
                } else {
                    return decodedPayload.sub;
                }
            } catch (e) {
                console.warn('this payload is not a JSON string');
                return Base64.decode(jwtArr[1]);
            }
        }
    } else {
        throw Error('this is not a jwt string');
    }
}

/**
 * obj转JSON字符串并base64
 *
 * @export
 * @param {object} obj
 * @returns {string}
 */
export function obj2base64(obj: object): string {
    return Base64.encode(JSON.stringify(obj));
}

/**
 * 签发jwt字符串
 *
 * @export
 * @param {*} freeObj
 * @returns {string}
 */
// export function encodeJWT(freeObj: any): string {
//     const header: jwtHeader = { alg: 'HS256', typ: 'JWT' };
//     const payload: jwtPayload = {
//         sub: freeObj
//     };
//     const signTime: Date = new Date();
//     // 签发时间
//     payload.iat = parseInt((signTime.getTime() / 1000).toString());
//     // 过期时间
//     payload.exp = payload.iat + 14400;
//     // 签发人
//     payload.iss = "web";
//     // jwtid
//     payload.jti = getTimeString(signTime) + '.' + randomString();
//     return KJUR.jws.JWS.sign(header.alg, JSON.stringify(header), JSON.stringify(payload), secret);
// }
