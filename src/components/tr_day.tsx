import { IDay } from "../types/types";
import { Button } from "react-bootstrap";

interface IProps {
  day: IDay;
}

const TrDay = ({ day }: IProps) => {
  return (
    <tr>
      {/* <td>С 1 по {day.date.getDate()}</td> */}
      <td>{day.date.toLocaleDateString()}</td>
      <td>{day.production}</td>
      <td>{day.total_consumed}</td>
      <td>{day.ZBC_consumed}</td>
      <td>{day.generation}</td>
      <td>{day.procentage}</td>
      <td>{day.sold}</td>
      <td>{day.RUP_consumed}</td>
      <td>{day.power}</td>
      <td>{day.isPlus && "+"}</td>
      <td>{day.gkal}</td>
      <td className="button_delete th_hide">
        <Button variant="link">Удалить</Button>
      </td>
    </tr>
  );
};

export default TrDay;
