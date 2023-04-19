export interface ICreateProject {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    scale: boolean;
    categories: string[];
}

export interface IProject {
    pk: number;
    description: string;
    name: string;
}
