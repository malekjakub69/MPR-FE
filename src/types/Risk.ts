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
        name: string;
        description: string;
        danger: string;
        trigger: string;
        reaction: string;
        status: string;
        impact: string;
        probability: string;
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
