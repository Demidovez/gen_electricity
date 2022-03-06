import { IDayRaw, IMonth } from "../types/types";

export const getMonths = (days: IDayRaw[], year: number): IMonth[] => {
  let months: IMonth[] = [];

  days
    .filter((day) => new Date(day.date).getFullYear() === year)
    .forEach((day) => {
      const monthId = new Date(day.date).getMonth() + 1;

      const month = months.find(
        (month) => month.number === monthId && month.year === year
      );

      if (month) {
        months = months.map((oldMonth) => {
          if (
            oldMonth.number === month.number &&
            oldMonth.year === month.year
          ) {
            return {
              ...oldMonth,
              production: oldMonth.production + day.production,
              total_consumed: oldMonth.total_consumed + day.total_consumed,
              ZBC_consumed: oldMonth.ZBC_consumed + day.ZBC_consumed,
              generation: oldMonth.generation + day.generation,
              procentage: oldMonth.procentage + day.procentage,
              sold: oldMonth.sold + day.sold,
              RUP_consumed: oldMonth.RUP_consumed + day.RUP_consumed,
              gkal: oldMonth.gkal + day.gkal,
            };
          } else {
            return oldMonth;
          }
        });
      } else {
        months.push({
          number: monthId,
          year: year,
          production: day.production,
          total_consumed: day.total_consumed,
          ZBC_consumed: day.ZBC_consumed,
          generation: day.generation,
          procentage: day.procentage,
          sold: day.sold,
          RUP_consumed: day.RUP_consumed,
          gkal: day.gkal,
          isShow: false,
          days: [],
        });
      }
    });

  return months;
};
