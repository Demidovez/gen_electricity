import { IYear } from "../types/types";
import { getKvartalNumber } from "../utils/utils";
import days from "./days.json";
import { getDays } from "./get_days";
import { getKvartals } from "./get_kvartals";
import { getMonths } from "./get_months";
import years from "./years.json";

export const fetchYears = async (): Promise<{ data: IYear[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lastYearNumber = years[years.length - 1].date;

  const kvartalsLastYear = getKvartals(days, lastYearNumber);
  const monthsLastYear = getMonths(days, lastYearNumber).sort(
    (a, b) => a.number - b.number
  );

  const lastMonth = monthsLastYear[monthsLastYear.length - 1];

  const daysLastMonth = getDays(days, lastMonth);

  return {
    data: years.map((year) => {
      return {
        ...year,
        key: "year_" + year.date,
        isShow: year.date === lastYearNumber,
        kvartals:
          year.date === lastYearNumber
            ? kvartalsLastYear.map((kvartal) => ({
                ...kvartal,
                months: monthsLastYear
                  .filter(
                    (month) => kvartal.number === getKvartalNumber(month.number)
                  )
                  .map((month) => {
                    return {
                      ...month,
                      isShow: month.number === lastMonth.number,
                      days:
                        month.number === lastMonth.number &&
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
): Promise<{ data: IYear | undefined }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const findYear = years.find((yearFromList) => yearFromList.date === date);

  if (findYear) {
    const kvartals = getKvartals(days, findYear.date);
    const months = getMonths(days, findYear.date).sort(
      (a, b) => a.number - b.number
    );

    return {
      data: {
        ...findYear,
        key: "year_" + findYear.date,
        isShow: true,
        kvartals: kvartals.map((kvartal) => ({
          ...kvartal,
          months: months.filter(
            (month) => kvartal.number === getKvartalNumber(month.number)
          ),
        })),
      },
    };
  } else {
    return { data: undefined };
  }
};
