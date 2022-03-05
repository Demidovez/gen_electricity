import { IDay, IYear } from "../types/types";
import days from "./days.json";
import years from "./years.json";

export const fetchDays = async (): Promise<{ data: IDay[] }> => {
  return {
    data: days
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((day) => {
        const date = new Date(day.date);

        return {
          ...day,
          date,
        };
      }),
  };
};

export const fetchYears = async (): Promise<{ data: IYear[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: years.map((year) => {
      return {
        ...year,
      };
    }),
  };
};
