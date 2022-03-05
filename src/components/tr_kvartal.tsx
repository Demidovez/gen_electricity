import { IKvartal } from "../types/types";

interface IProps {
  kvartal: IKvartal;
}

const TrKvartal = ({ kvartal }: IProps) => {
  return (
    <tr className="table-info">
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
  );
};

export default TrKvartal;
