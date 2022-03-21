import { Table } from "antd";

export interface IAction {
  type: string;
  payload: any | null;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "date";
  record: IDay;
  index: number;
  children: React.ReactNode;
}

export type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export interface IRawData {
  date: string;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  power: number;
  plus: boolean;
  gkal: number;
}

export interface ITableData extends Omit<IRawData, "date"> {
  key: string;
  shortdate: string;
  children: ITableData[];
}

export interface IData extends ITableData {
  date: string;
  year: number;
  index: number;
}

export interface IDay extends IData {
  fulldate: string;
}

export interface IMonth extends IData {
  month: number;
}

export interface IKvartal extends IData {
  kvartal: number;
}

export interface IYear extends IData {
  days?: IDay[];
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
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
