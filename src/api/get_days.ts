import { IData } from "../types/types";

export const getDays = (days: IData[], month: IData): IData[] => {
  return days
    .filter(
      (day) =>
        new Date(day.date).getFullYear() === month.year &&
        (new Date(day.date).getMonth() + 1).toString() === month.date
    )
    .map((day) => ({
      ...day,
      date: `C 1 по ${new Date(day.date).getDate()}`,
      key: `day_${new Date(day.date).getTime()}`,
    }));
};
