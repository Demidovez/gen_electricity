import { IData } from "../types/types";
import { getKvartalNumber } from "../utils/utils";

export const getKvartals = (days: IData[], year: number): IData[] => {
  let kvartals: IData[] = [];

  days
    .filter((day) => new Date(day.date).getFullYear() === year)
    .forEach((day) => {
      const month = new Date(day.date).getMonth();

      const kvartal = kvartals.find(
        (kvartal) =>
          kvartal.date === getKvartalNumber(month).toString() &&
          kvartal.year === year
      );

      if (kvartal) {
        kvartals = kvartals.map((oldKvartal) => {
          if (
            oldKvartal.date === kvartal.date &&
            oldKvartal.year === kvartal.year
          ) {
            return {
              ...oldKvartal,
              production: oldKvartal.production + day.production,
              total_consumed: oldKvartal.total_consumed + day.total_consumed,
              ZBC_consumed: oldKvartal.ZBC_consumed + day.ZBC_consumed,
              generation: oldKvartal.generation + day.generation,
              procentage: oldKvartal.procentage + day.procentage,
              sold: oldKvartal.sold + day.sold,
              RUP_consumed: oldKvartal.RUP_consumed + day.RUP_consumed,
              gkal: oldKvartal.gkal + day.gkal,
            };
          } else {
            return oldKvartal;
          }
        });
      } else {
        kvartals.push({
          key: `kvartal_${getKvartalNumber(month)}`,
          date: getKvartalNumber(month).toString(),
          year: year,
          production: day.production,
          total_consumed: day.total_consumed,
          ZBC_consumed: day.ZBC_consumed,
          generation: day.generation,
          procentage: day.procentage,
          sold: day.sold,
          RUP_consumed: day.RUP_consumed,
          gkal: day.gkal,
          expandable: false,
          children: [],
        });
      }
    });

  return kvartals;
};
