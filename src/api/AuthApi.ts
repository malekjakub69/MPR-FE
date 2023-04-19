import axios from "axios";
import { IUser, IUserLogin } from "../types";
import { buildUrl } from "./BaseApi";
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
    return (
        await axios.post<any>(buildUrl("/login"), bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    ).data;
}
