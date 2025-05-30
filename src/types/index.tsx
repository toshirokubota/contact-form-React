
const queryValues = [ 'queryGeneral' , 'querySupport' ] as const;
export type QueryType = (typeof queryValues)[number];  
export const isValidQueryType = (value: any): value is QueryType => queryValues.includes(value);

export type FormObject = {
    firstName: string,
    lastName: string,
    email: string,
    message: string,
    queryType: QueryType | undefined,
    consent: boolean
}
