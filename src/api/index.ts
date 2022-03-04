import { IDay } from "../types/types";
import days from "./days.json";

export const fetchDays = (): { data: IDay[] } => {
  return {
    data: days.map((day) => {
      const date = new Date(day.date);

      return {
        ...day,
        date,
      };
    }),
  };
};

export const fetchYears = (): { data: IDay[] } => {
  return {
    data: days.map((day) => {
      const date = new Date(day.date);

      return {
        ...day,
        date,
      };
    }),
  };
};
