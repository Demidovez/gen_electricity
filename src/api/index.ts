import { IDay, IYear } from "../types/types";
import days from "./days.json";
import years from "./years.json";

export const fetchYears = async (): Promise<{ data: IYear[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: years.map((year) => {
      return {
        ...year,
        kvartals: [],
      };
    }),
  };
};

export const fetchYear = async (
  year: number
): Promise<{ data: IYear | undefined }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const findYear = years.find((yearFromList) => yearFromList.year === year);

  if (findYear) {
    return {
      data: { ...findYear, kvartals: [] },
    };
  } else {
    return { data: undefined };
  }
};
