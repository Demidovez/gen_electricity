import { IData } from "../types/types";
import { summa } from "../utils/utils";

export const getMonths = (days: IData[], year: number): IData[] => {
  let months: IData[] = [];

  days
    .filter((day) => new Date(day.date).getFullYear() === year)
    .forEach((day) => {
      const monthId = new Date(day.date).getMonth() + 1;

      const month = months.find(
        (month) => month.date === monthId.toString() && month.year === year
      );

      if (month) {
        months = months.map((oldMonth) => {
          if (oldMonth.date === month.date && oldMonth.year === month.year) {
            return {
              ...oldMonth,
              production: summa(oldMonth.production, day.production),
              total_consumed: summa(
                oldMonth.total_consumed,
                day.total_consumed
              ),
              ZBC_consumed: summa(oldMonth.ZBC_consumed, day.ZBC_consumed),
              generation: summa(oldMonth.generation, day.generation),
              procentage: summa(oldMonth.procentage, day.procentage),
              sold: summa(oldMonth.sold, day.sold),
              RUP_consumed: summa(oldMonth.RUP_consumed, day.RUP_consumed),
              gkal: summa(oldMonth.gkal, day.gkal),
            };
          } else {
            return oldMonth;
          }
        });
      } else {
        months.push({
          key: `month_${monthId}`,
          date: monthId.toString(),
          year: year,
          production: day.production,
          total_consumed: day.total_consumed,
          ZBC_consumed: day.ZBC_consumed,
          generation: day.generation,
          procentage: day.procentage,
          sold: day.sold,
          RUP_consumed: day.RUP_consumed,
          gkal: day.gkal,
          children: [],
        });
      }
    });

  return months;
};
