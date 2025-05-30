import { isValidQueryType, type QueryType } from "../types";

export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const isValidEmailAddress = (addr: string): boolean => {
    return emailRegex.test(addr);
}

// type ValidatorObject = {
//     'firstName': boolean,
//     'lastName': boolean,
//     'email': boolean,
//     'queryType' : boolean,
//     'message': boolean,
//     'consent': boolean,
// }
// const validator = {
//     'firstName': (str: string) => str.length > 0,
//     'lastName': (str: string) => str.length > 0,
//     'email': (str: string) => emailRegex.test(str),
//     'queryType' : (str: QueryType) => isValidQuery(str),
//     'message': (str: string) => str.length > 0,
//     'consent': (value: boolean) => value,
// }

export function formVaidator(str: string, value:string|boolean|QueryType): boolean {
    if(str === 'firstName' || str === 'lastName' || str == 'message') {
        return (value as string).length > 0;
    } else if(str === 'email') {
        return isValidEmailAddress(value as string);
    } else if(str === 'queryType') {
        return isValidQueryType(value as QueryType);
    } else if(str === 'consent') {
        return value as boolean;
    } else {
        return false;
    }
}

