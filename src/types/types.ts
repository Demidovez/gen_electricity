export interface IAction {
  type: string;
  payload: any | null;
}

export interface IDay {
  date: Date;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  power: number;
  isPlus: boolean;
  gkal: number;
}

export interface IYear {
  year: number;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  gkal: number;
  kvartals: IKvartal[];
}

export interface IKvartal {
  number: number;
  year: number;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  gkal: number;
  months: IMonth[];
}

export interface IMonth {
  number: number;
  year: number;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  gkal: number;
  isActive: boolean;
  days: IDay[];
}

export enum EStatus {
  LOADING,
  DONE,
  IDLE,
  ERROR,
}

export const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апреля",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
