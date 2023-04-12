import { AxiosResponse } from "axios";
import { ILoginResponse, IUserFull, IUserLogin } from "../types";
import { BaseApi } from "./index";

export async function authenticate(): Promise<IUserFull[]> {
    return (await BaseApi.post<IUserFull[]>("/authenticate")).data;
}

export function logoutRefreshToken(): Promise<AxiosResponse<ILoginResponse>> {
    return BaseApi.post<ILoginResponse>("/logout/refresh");
}

export function logoutAccessToken(): Promise<AxiosResponse<ILoginResponse>> {
    return BaseApi.post<ILoginResponse>("/logout/access");
}

export async function logIn(login: IUserLogin): Promise<ILoginResponse> {
    return (await BaseApi.post<ILoginResponse>("/login", login)).data;
}
