import { IUser, IUserLogin } from "../types";
import { BaseApi } from "./index";

export async function authenticate(): Promise<Boolean> {
    return (await BaseApi.post<IUser[]>("/logged")).status === 200;
}

export async function logout(): Promise<Boolean> {
    return (await BaseApi.post<IUser[]>("/logged")).status === 200;
}

export async function logIn(login: IUserLogin): Promise<IUser[]> {
    var bodyFormData = new FormData();
    bodyFormData.append("email", login.login);
    bodyFormData.append("password", login.password);
    return (await BaseApi.post<IUser[]>("/login", bodyFormData)).data;
}
