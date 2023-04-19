import { IProject } from "../types";
import { BaseApi } from "./index";

export async function getAll(): Promise<IProject[]> {
    return (await BaseApi.getBase<IProject[]>("/projects")).data;
}
