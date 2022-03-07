import axios from "axios";
import { IData } from "../types/types";

export const fetchData = (): Promise<[IData[], IData[]]> => {
  const yearsPromise = axios
    .get("http://localhost:9081/get_years")
    .then(({ data }) => data as IData[])
    .catch((err) => {
      console.log(err);

      return [];
    });

  const daysPromise = axios
    .get("http://localhost:9081/get_days")
    .then(({ data }) => data as IData[])
    .catch((err) => {
      console.log(err);

      return [];
    });

  return Promise.all([yearsPromise, daysPromise]);
};
