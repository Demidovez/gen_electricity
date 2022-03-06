import { IDay, IDayRaw, IMonth } from "../types/types";

export const getDays = (days: IDayRaw[], month: IMonth): IDay[] => {
  return days
    .filter(
      (day) =>
        new Date(day.date).getFullYear() === month.year &&
        new Date(day.date).getMonth() + 1 === month.number
    )
    .map((day) => ({ ...day, date: new Date(day.date) }));
};
