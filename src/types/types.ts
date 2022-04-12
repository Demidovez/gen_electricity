import { Table, TableProps } from "antd";

export interface IAction {
  type: string;
  payload: any | null;
}

export interface EditableRowProps {
  index: number;
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
  power: number | null;
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
  onEdit?: () => {};
  onCancel?: () => {};
  onUpdate?: (key: string, data: IRawData) => {};
  onRemove?: () => {};
  onExpand?: () => {};
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

export enum EType {
  year,
  kvartal,
  month,
}

export interface IExpanded {
  value: number;
  key: string;
  type: EType;
}

export interface IExpandedRow {
  year: IExpanded;
  kvartals: IExpanded[];
  months: IExpanded[];
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

export enum RESULT {
  ok,
  error,
  idle,
  loading,
}

export interface IUser {
  id: any;
  login: string;
  firstname: string;
  lastname: string;
  secondname: string;
  role: string;
}

export interface IInputData<T> {
  value: T;
  isError: boolean;
}

export type TypeTR = TableProps<IData> &
  IData & { lineKey: string; isEditedKey: boolean };
