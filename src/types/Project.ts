import { IRisk } from "./Risk";

export interface ICreateProject {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    scale: boolean;
    categories: string[];
}