import { IMonth, IYear } from "../types/types";

interface IProps {
  month: IMonth;
}

const TrMonth = ({ month }: IProps) => {
  return (
    <tr className="table-secondary">
      <td>{month.number} квартал</td>
      <td>{month.production}</td>
      <td>{month.total_consumed}</td>
      <td>{month.ZBC_consumed}</td>
      <td>{month.generation}</td>
      <td>{month.procentage}</td>
      <td>{month.sold}</td>
      <td>{month.RUP_consumed}</td>
      <td></td>
      <td></td>
      <td>{month.gkal}</td>
    </tr>
  );
};

export default TrMonth;
