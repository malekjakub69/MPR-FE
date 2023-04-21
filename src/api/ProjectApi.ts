import { ICreateProject, ICreateRisk, IProject, IRisk } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IProject[]> {
    return (await BaseApi.get<IProject[]>("/projects")).data;
}

export async function getOne(pk: string): Promise<IProject> {
    return (await BaseApi.get<IProject[]>(`/project/${pk}`)).data[0];
}

export async function getProjectRisk(pk: string): Promise<IRisk[]> {
    return (await BaseApi.get<IRisk[]>(`/project_risks/${pk}`)).data;
}

export async function createProjectRisk(data: ICreateRisk): Promise<IRisk[]> {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("danger", data.name);
    bodyFormData.append("trigger", data.description);
    bodyFormData.append("reaction", data.name);
    bodyFormData.append("status", data.description);
    bodyFormData.append("impact", data.description);
    bodyFormData.append("probability", data.description);
    bodyFormData.append("project_id", data.description);
    return (await BaseApi.post<IRisk[]>(`/create_risk/`, data)).data;
}

export async function createProject(data: ICreateProject): Promise<IProject[]> {
    var bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("startDate", data.startDate.toISOString());
    bodyFormData.append("endDate", data.endDate.toISOString());
    bodyFormData.append("scale", data.scale.toString());
    return (await BaseApi.post<IProject[]>(`/create_project/`, data)).data;
}
