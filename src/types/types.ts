export interface IAction {
    type: string;
    payload: any | null;
}

export interface IDay {
    date: Date,
    production: number,
    total_consumed: number,
    ZBC_consumed: number,
    generation: number,
    procentage: number,
    sold: number,
    RUP_consumed: number,
    power: number,
    isPlus: boolean,
    gkal: number
}