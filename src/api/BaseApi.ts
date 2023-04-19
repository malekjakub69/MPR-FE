import axios, { AxiosResponse } from "axios";
import config from "../api-config";
import { BaseApiGetType, BaseApiType } from "../types";

const BASE_URL = `${config.ApiEndpoint}`;

export function buildUrl(path: string, id?: number) {
    return `${BASE_URL}${path}${id ? "/" + id : ""}`;
}

export function getBase<T>(path: string): Promise<BaseApiGetType<T>> {
    return axios.get(buildUrl(path)).then((result) => {
        return result.data;
    });
}

export function deleteBase<T>(path: string): Promise<BaseApiType<T>> {
    return axios.delete(buildUrl(path)).then((result) => {
        return { items: result.data.items, message: result.data.message };
    });
}

export function postSingle<T>(path: string, requestData: unknown): Promise<BaseApiType<T>> {
    return axios.post(buildUrl(path), requestData).then((result) => {
        return { items: result.data.items, message: result.data.message };
    });
}

export function post<T>(path: string, requestData?: unknown): Promise<AxiosResponse<T>> {
    return axios.post(buildUrl(path), requestData).then((result) => result);
}

export function put<T>(path: string, requestData: unknown): Promise<BaseApiType<T>> {
    return axios.put(buildUrl(path), requestData).then((result) => {
        return { items: result.data.items, message: result.data.message };
    });
}
