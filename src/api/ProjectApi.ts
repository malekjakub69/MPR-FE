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
    bodyFormData.append("title", data.title);
    bodyFormData.append("description", data.description);
    bodyFormData.append("danger", data.danger);
    bodyFormData.append("trigger", data.trigger);
    bodyFormData.append("reaction", data.reaction);
    bodyFormData.append("status", data.status.toString());
    bodyFormData.append("impact", data.impact.toString());
    bodyFormData.append("probability", data.probability.toString());
    bodyFormData.append("project", data.project_pk);
    bodyFormData.append("category", data.category);
    return (await BaseApi.post<IRisk[]>(`/create_risk`, bodyFormData)).data;
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
