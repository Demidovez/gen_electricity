import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";
import { IKvartal, IMonth } from "../types/types";
import { getKvartalNumber } from "../utils/utils";
import AddDataLine from "./add_data_line";
import LoadingBody from "./loading_body";
import TrDay from "./tr_day";
import TrKvartal from "./tr_kvartal";
import TrMonth from "./tr_month";
import TrYear from "./tr_year";

const TableData = () => {
  const { days, years, isLoadingDays, isLoadingYears } = useAppSelector(
    (state) => state.days
  );

  const [kvartals, setKvartals] = useState<IKvartal[]>([]);
  const [months, setMonths] = useState<IMonth[]>([]);

  useEffect(() => {
    let kvartals: IKvartal[] = [];

    days.forEach((day) => {
      const month = new Date(day.date).getMonth();
      const year = new Date(day.date).getFullYear();

      const kvartal = kvartals.find(
        (kvartal) =>
          kvartal.number === getKvartalNumber(month) && kvartal.year === year
      );

      if (kvartal) {
        kvartals = kvartals.map((oldKvartal) => {
          if (
            oldKvartal.number === kvartal.number &&
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
          number: getKvartalNumber(month),
          year: year,
          production: day.production,
          total_consumed: day.total_consumed,
          ZBC_consumed: day.ZBC_consumed,
          generation: day.generation,
          procentage: day.procentage,
          sold: day.sold,
          RUP_consumed: day.RUP_consumed,
          gkal: day.gkal,
        });
      }
    });

    setKvartals(kvartals);
  }, [days]);

  return (
    <div className="table_days">
      <Container fluid>
        {isLoadingYears ? (
          <LoadingBody />
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th rowSpan={2}>Дата/Месяц/Год</th>
                <th rowSpan={2}>Выработка целлюлозы, тонн.</th>
                <th colSpan={2}>Прямое потребление</th>
                <th rowSpan={2}>Выработка электроэнергии, тыс. кВтч</th>
                <th rowSpan={2}>% от общего потребления</th>
                <th rowSpan={2}>Продано, тыс. кВтч</th>
                <th colSpan={4}>Потреблено от РУП "Гомельэнерго"</th>
              </tr>
              <tr>
                <th>Всего, тыс. кВтч</th>
                <th>в том числе ЗБЦ, тыс. кВтч</th>
                <th>тыс. кВтч</th>
                <th colSpan={2}>Мощность, МВт</th>
                <th>Гкал</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year) => {
                return <TrYear year={year} key={year.year} />;
              })}
              {months.map((month) => {
                return (
                  <TrMonth
                    month={month}
                    key={month.number + "_" + month.year}
                  />
                );
              })}
              {kvartals.map((kvartal) => {
                return (
                  <TrKvartal
                    kvartal={kvartal}
                    key={kvartal.number + "_" + kvartal.year}
                  />
                );
              })}
              {days.map((day) => {
                return <TrDay day={day} key={day.date.getTime()} />;
              })}
              <AddDataLine />
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default TableData;
