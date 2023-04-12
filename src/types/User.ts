export interface IUserFull extends IUser {
    is_registered: boolean;
    language: {
        code: string;
        title: string;
    };
    language_id: null;
    last_login: string;
    login: string;
    role: IRole;
    role_id: RoleCode;
    unread_messages: number;
}

export interface IUser {
    id: number;
    first_name: string;
    surname: string;
    email: string;
}

export interface IRole {
    code: string;
    id: number;
    name: string;
}

//TODO: udělt role dynamicky ne staticky
export enum RoleCode {
    filler = 6,
    packer = 5,
    warehouseman = 4,
    admin = 3,
    logistics = 2,
    manipulator = 1,
}

export interface IUserLogin {
    login: string;
    password: string;
}

export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    items: IUserFull[];
}
