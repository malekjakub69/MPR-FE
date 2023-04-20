import { IProject, IRisk } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IProject[]> {
    return (await BaseApi.getBase<IProject[]>("/projects")).data;
}

export async function getOne(pk: string): Promise<IProject> {
    return (await BaseApi.getBase<IProject[]>(`/project/${pk}`)).data[0];
}

export async function getProjectRisk(pk: string): Promise<IRisk[]> {
    return (await BaseApi.getBase<IRisk[]>(`/project_risks/${pk}`)).data;
}
