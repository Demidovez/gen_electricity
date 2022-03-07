import { Table } from "antd";

export interface IAction {
  type: string;
  payload: any | null;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IData;
  record: IData;
  handleSave: (record: IData) => void;
}

export interface EditableRowProps {
  index: number;
}

export type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export type TColumn = ColumnTypes[number] & {
  editable?: boolean;
  dataIndex?: string;
  children?: any[];
};

export interface IData {
  key: string;
  date: string;
  year?: number;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  power?: number;
  plus?: string;
  gkal: number;
  children?: IData[];
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
