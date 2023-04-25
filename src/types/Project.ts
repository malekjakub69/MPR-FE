export interface ICreateProject {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    scale: boolean;
}

export interface IProject {
    pk: number;
    fields: {
        date_begin: string;
        date_end: string;
        description: string;
        name: string;
        owner_id: number;
        status: string;
        scale_risk: boolean;
    };
    model?: string;
}
