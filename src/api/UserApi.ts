import { IUser } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IUser[]> {
    return (await BaseApi.get<IUser[]>("/users")).data;
}