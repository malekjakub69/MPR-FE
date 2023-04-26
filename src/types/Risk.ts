export enum ERiskCats {
    TINY,
    LOW,
    MEDIUM,
    HIGH,
    EXTREME,
}

export enum ERiskStatus {
    CONCEPT,
    ACTIVE,
    CLOSED,
    DELETED,
    TRANSPIRED,
}

export interface IRisk {
    pk: number;
    fields: {
        category: number;
        danger: string;
        date_identified: string;
        date_reaction: string;
        date_updated: string;
        description: string;
        impact: string;
        owner: number;
        probability: string;
        project: number;
        reactions: string;
        status: string;
        title: string;
        trigger: string;
    };
    model?: string;
}

export interface ICreateRisk {
    title: string;
    description: string;
    danger: string;
    trigger: string;
    reaction: string;
    status: string;
    impact: string;
    probability: string;
    project_pk: string;
    category: number;
}
