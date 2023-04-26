import { ICreateUser, IUser } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IUser[]> {
    return (await BaseApi.get<IUser[]>("/users")).data;
}

export async function update(data: ICreateUser): Promise<ICreateUser[]> {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("email", data.email);
    bodyFormData.append("role", data.role);
    return (await BaseApi.post<ICreateUser[]>(`/users`, bodyFormData)).data;
}

export async function deleteUser(pk: number): Promise<any> {
    return await BaseApi.get(`/delete_user/${pk}`);
}
