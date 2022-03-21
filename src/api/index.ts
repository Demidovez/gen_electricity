import { IDay, IYear } from "../types/types";

import axios from "axios";

export const fetchYears = async (): Promise<IYear[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return axios
    .get("http://localhost:9082/get_years")
    .then(({ data }) => data as IYear[])
    .catch((err) => {
      console.log(err);

      return [];
    });
};

export const fetchDays = async (year: number = 0): Promise<IYear[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return axios
    .get("http://localhost:9082/get_days/" + year)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);

      return [];
    });
};

export const updateDayData = (data: IDay) => {
  axios
    .post("http://localhost:9082/update_day", { data })
    .then(() => console.log("UPDATED!"))
    .catch((err) => console.log(err));
};

export const insertDayData = (data: IDay) => {
  axios
    .post("http://localhost:9082/insert_day", { data })
    .then(() => console.log("INSERTED!"))
    .catch((err) => console.log(err));
};
