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

export interface IDayRaw {
  date: string;
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
  key: number | string;
  date: number;
  production: number;
  total_consumed: number;
  ZBC_consumed: number;
  generation: number;
  procentage: number;
  sold: number;
  RUP_consumed: number;
  gkal: number;
  isShow: boolean;
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
  isShow: boolean;
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

export const COLUMNS = [
  {
    title: "Дата/Месяц/Год",
    dataIndex: "date",
    key: "date",
    width: 150,
  },
  {
    title: "Выработка целлюлозы, тонн.",
    dataIndex: "production",
    key: "production",
    width: 150,
  },
  {
    title: "Прямое потребление",
    children: [
      {
        title: "Всего, тыс. кВтч",
        dataIndex: "total_consumed",
        key: "total_consumed",
      },
      {
        title: "в том числе ЗБЦ, тыс. кВтч",
        dataIndex: "ZBC_consumed",
        key: "ZBC_consumed",
      },
    ],
  },

  {
    title: "Выработка электроэнергии, тыс. кВтч",
    dataIndex: "generation",
    key: "generation",
    width: 150,
  },
  {
    title: "% от общего потребления",
    dataIndex: "procentage",
    key: "procentage",
    width: 150,
  },
  {
    title: "Продано, тыс. кВтч",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: 'Потреблено от РУП "Гомельэнерго"',
    children: [
      {
        title: "тыс. кВтч",
        dataIndex: "RUP_consumed",
        key: "RUP_consumed",
        width: 90,
      },
      {
        title: "Мощность, МВт",
        dataIndex: "power",
        key: "power",
        colSpan: 2,
      },
      {
        title: "",
        dataIndex: "isPlus",
        key: "isPlus",
        colSpan: 0,
      },
      {
        title: "Гкал",
        dataIndex: "gkal",
        key: "gkal",
        width: 70,
      },
    ],
  },
];
