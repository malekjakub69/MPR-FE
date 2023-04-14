export enum ERiskCats {
    TINY,
    LOW,
    MEDIUM,
    HIGH,
    EXTREME
}

export enum ERiskStatus {
    CONCEPT,
    ACTIVE,
    CLOSED,
    DELETED,
    TRANSPIRED
}

export interface IRisk {
    name: string,
    description: string,
    danger: string,
    trigger: string,
    reaction: string,
    status: ERiskStatus,
    impact: ERiskCats,
    probability: ERiskCats
}