import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";
import { IKvartal, IMonth } from "../types/types";
import { getKvartalNumber } from "../utils/utils";
import AddDataLine from "./add_data_line";
import Loading from "./loading";
import TrDay from "./tr_day";
import TrKvartal from "./tr_kvartal";
import TrMonth from "./tr_month";
import TrYear from "./tr_year";

const TableData = () => {
  const { years, isLoadingYear, isLoadingYears } = useAppSelector(
    (state) => state.years
  );

  return (
    <div className="table_days">
      <Container fluid>
        {isLoadingYears ? (
          <Loading />
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
              <AddDataLine />
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default TableData;
