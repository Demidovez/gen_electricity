import { IData } from "../types/types";
import { getKvartalNumber } from "../utils/utils";
import { getDays } from "./get_days";
import { getKvartals } from "./get_kvartals";
import { getMonths } from "./get_months";
import axios from "axios";
import { fetchData } from "./fetch_data";

export const fetchYears = async (): Promise<{ data: IData[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [years, days] = await fetchData();

  const lastYearNumber = years[years.length - 1].date;

  const kvartalsLastYear = getKvartals(days, parseInt(lastYearNumber));
  const monthsLastYear = getMonths(days, parseInt(lastYearNumber)).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lastMonth = monthsLastYear[monthsLastYear.length - 1];

  const daysLastMonth = getDays(days, lastMonth);

  return {
    data: years.map((year) => {
      return {
        ...year,
        key: "year_" + year.date,
        children:
          year.date === lastYearNumber
            ? kvartalsLastYear.map((kvartal) => ({
                ...kvartal,
                children: monthsLastYear
                  .filter(
                    (month) =>
                      kvartal.date ===
                      getKvartalNumber(parseInt(month.date)).toString()
                  )
                  .map((month) => {
                    return {
                      ...month,
                      children:
                        month.date === lastMonth.date &&
                        month.year === lastMonth.year
                          ? daysLastMonth
                          : [],
                    };
                  }),
              }))
            : [],
      };
    }),
  };
};

export const fetchYear = async (
  date: number
): Promise<{ data: IData | undefined }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [years, days] = await fetchData();

  const findYear = years.find(
    (yearFromList) => yearFromList.date === date.toString()
  );

  if (findYear) {
    const kvartals = getKvartals(days, parseInt(findYear.date));
    const months = getMonths(days, parseInt(findYear.date)).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      data: {
        ...findYear,
        key: "year_" + findYear.date,
        children: kvartals.map((kvartal) => ({
          ...kvartal,
          children: months.filter(
            (month) =>
              kvartal.date === getKvartalNumber(parseInt(month.date)).toString()
          ),
        })),
      },
    };
  } else {
    return { data: undefined };
  }
};

export const updateDayData = (data: IData) => {
  axios
    .post("http://localhost:9081/update_day", { data })
    .then(() => console.log("UPDATED!"))
    .catch((err) => console.log(err));
};
