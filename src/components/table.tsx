import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";
import { IDay } from "../types/types";
import AddDataLine from "./add_data_line";

const TableData = () => {
  const { days, status } = useAppSelector((state) => state.days);

  return (
    <div className="table_data">
      <Container fluid>
        <table className="table table-sm table-bordered table-hover">
          <thead className="thead-dark border-white">
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
            <tr className=" table-primary">
              <td>2017</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>733</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td>75098</td>
            </tr>
            <tr className="table-primary">
              <td>2017</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>733</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td>75098</td>
            </tr>
            <tr className="table-primary">
              <td>2017</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>733</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td></td>
              <td>75098</td>
            </tr>
            <tr className="table-secondary">
              <td>Январь</td>
              <td>31003</td>
              <td>27112</td>
              <td>23549</td>
              <td>34626</td>
              <td>127.7</td>
              <td>7641</td>
              <td>126.6</td>
              <td>0</td>
              <td></td>
              <td>10670</td>
            </tr>
            <tr className="table-info">
              <td>1 квартал</td>
              <td>69231</td>
              <td>68550</td>
              <td>61447</td>
              <td>67228</td>
              <td>98.07</td>
              <td>5517</td>
              <td>6822</td>
              <td></td>
              <td></td>
              <td>56371</td>
            </tr>
            <tr>
              <td>С 1 по 1</td>
              <td>1014</td>
              <td>826.6</td>
              <td>763.2</td>
              <td>1067.7</td>
              <td>129.17</td>
              <td>241.1</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td>112</td>
              <td className="button_delete th_hide">
                <Button variant="link">Удалить</Button>
              </td>
            </tr>
            <tr>
              <td>С 1 по 1</td>
              <td>1014</td>
              <td>826.6</td>
              <td>763.2</td>
              <td>1067.7</td>
              <td>129.17</td>
              <td>241.1</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td>112</td>
              <td className="button_delete th_hide">
                <Button variant="link">Удалить</Button>
              </td>
            </tr>
            <tr>
              <td>С 1 по 1</td>
              <td>1014</td>
              <td>826.6</td>
              <td>763.2</td>
              <td>1067.7</td>
              <td>129.17</td>
              <td>241.1</td>
              <td>0</td>
              <td>0</td>
              <td></td>
              <td>112</td>
              <td className="button_delete th_hide">
                <Button variant="link">Удалить</Button>
              </td>
            </tr>
            <AddDataLine />
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default TableData;
