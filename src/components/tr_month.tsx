import { IMonth, IYear } from "../types/types";
import TrDay from "./tr_day";

interface IProps {
  month: IMonth;
}

const TrMonth = ({ month }: IProps) => {
  return (
    <>
      <tr className="table-secondary">
        <td>{month.number} месяц</td>
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
      {month.isActive &&
        month.days.map((day) => {
          return <TrDay day={day} key={day.date.getTime()} />;
        })}
    </>
  );
};

export default TrMonth;
