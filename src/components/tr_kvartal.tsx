import { IKvartal } from "../types/types";
import TrMonth from "./tr_month";

interface IProps {
  kvartal: IKvartal;
  isShow: boolean;
}

const TrKvartal = ({ kvartal, isShow }: IProps) => {
  return (
    <>
      {kvartal.months.map((month) => {
        return (
          <TrMonth
            month={month}
            key={month.number + "_" + month.year}
            isShow={isShow}
          />
        );
      })}
      <tr className={`table-info ${isShow && "hide-line"}`}>
        <td>
          {kvartal.number} квартал {kvartal.year}
        </td>
        <td>{Number(kvartal.production.toFixed(2))}</td>
        <td>{Number(kvartal.total_consumed.toFixed(2))}</td>
        <td>{Number(kvartal.ZBC_consumed.toFixed(2))}</td>
        <td>{Number(kvartal.generation.toFixed(2))}</td>
        <td>{Number(kvartal.procentage.toFixed(2))}</td>
        <td>{Number(kvartal.sold.toFixed(2))}</td>
        <td>{Number(kvartal.RUP_consumed.toFixed(2))}</td>
        <td></td>
        <td></td>
        <td>{Number(kvartal.gkal.toFixed(2))}</td>
      </tr>
    </>
  );
};

export default TrKvartal;
