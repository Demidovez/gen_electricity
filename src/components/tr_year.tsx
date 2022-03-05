import { IYear } from "../types/types";

interface IProps {
  year: IYear;
}

const TrYear = ({ year }: IProps) => {
  return (
    <tr className="table-primary">
      <td>{year.year}</td>
      <td>{year.production}</td>
      <td>{year.total_consumed}</td>
      <td>{year.ZBC_consumed}</td>
      <td>{year.generation}</td>
      <td>{year.procentage}</td>
      <td>{year.sold}</td>
      <td>{year.RUP_consumed}</td>
      <td></td>
      <td></td>
      <td>{year.gkal}</td>
    </tr>
  );
};

export default TrYear;
