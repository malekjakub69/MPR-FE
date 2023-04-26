import { ICreateProject, ICreateRisk, IProject, IRisk } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IProject[]> {
    return (await BaseApi.get<IProject[]>("/projects")).data;
}

export async function getOne(pk: string): Promise<IProject> {
    return (await BaseApi.get<IProject[]>(`/project/${pk}`)).data[0];
}

export async function deleteProject(pk: number): Promise<any> {
    return await BaseApi.get(`/delete_project/${pk}`);
}

export async function createProject(data: ICreateProject): Promise<IProject[]> {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("date_begin", data.startDate.toISOString().substring(0, 10));
    bodyFormData.append("date_end", data.endDate.toISOString().substring(0, 10));
    bodyFormData.append("scale_risk", data.scale ? "True" : "False");
    bodyFormData.append("status", "CONCEPT");
    return (await BaseApi.post<IProject[]>(`/create_project`, bodyFormData)).data;
}
