export interface IUser {
    id: string;
	firstName : string;
	lastName: string
	telephone: number;
    email: string;
}

export type UserAction = {
    type: string
    payload: any
}
