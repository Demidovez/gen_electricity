import { IDay, IUser, IYear } from "../types/types";

import axios_base from "axios";
import { getApiUrl } from "../helpers/helpers";

const axios = axios_base.create({
  withCredentials: true,
  baseURL: getApiUrl(),
});

export const fetchYears = async (): Promise<IYear[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return axios
    .get("get_years")
    .then(({ data }) => data as IYear[])
    .catch((err) => {
      console.log(err);

      return [];
    });
};

export const fetchDays = async (year: number = 0): Promise<IYear[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return axios
    .get("get_days/" + year)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);

      return [];
    });
};

export const updateDayData = (data: IDay) => {
  axios
    .post("update_day", { data })
    .then(() => console.log("UPDATED!"))
    .catch((err) => console.log(err));
};

export const insertDayData = (data: IDay) => {
  axios
    .post("insert_day", { data })
    .then(() => console.log("INSERTED!"))
    .catch((err) => console.log(err));
};

export const deleteDayData = (data: string) => {
  axios
    .post("delete_day", { data })
    .then(() => console.log("DELETED!"))
    .catch((err) => console.log(err));
};

export const fetchExcelData = async (): Promise<string> => {
  try {
    return await axios.get("gen_excel");
  } catch (err) {
    console.log(err);

    return "";
  }
};

export const getExcelDataLink = () => {
  try {
    const link = document.createElement("a");
    link.href = "get_excel";
    link.setAttribute(
      "download",
      `Выработка и потребление электроэнергии.xlsx`
    );

    document.body.appendChild(link);

    link.click();

    link.parentNode?.removeChild(link);
  } catch (err) {
    console.log(err);
  }
};

export const tryLogin = async (options: any): Promise<IUser | undefined> => {
  try {
    const { data } = await axios.post("login", options);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const tryLogout = async (): Promise<boolean> => {
  try {
    const { data } = await axios.get("logout");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUser = async (): Promise<IUser | undefined> => {
  try {
    const { data } = await axios.get("get_user");

    return data;
  } catch (err) {
    console.log(err);
  }
};
