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
        status: ERiskStatus;
        impact: ERiskCats;
        probability: ERiskCats;
    };
    model?: string;
}

export interface ICreateRisk {
    title: string;
    description: string;
    danger: string;
    trigger: string;
    reaction: string;
    status: ERiskStatus;
    impact: ERiskCats;
    probability: ERiskCats;
    project_pk: string;
    category: string;
}
