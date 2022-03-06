import { useEffect, useState } from "react";
import { IMonth, IYear } from "../types/types";
import TrDay from "./tr_day";

interface IProps {
  month: IMonth;
  isShow: boolean;
}

const TrMonth = ({ month, isShow }: IProps) => {
  const [isShowDays, setIsShowDays] = useState(month.isShow);

  const onHandleMonth = () => {
    // dispatch(fetchYearAction(year.date));
    setIsShowDays(!isShowDays);
  };

  useEffect(() => {
    if (!isShow) {
      setIsShowDays(false);
    }
  }, [isShow]);

  return (
    <>
      <tr
        className={`table-secondary ${isShow && "hide-line"}`}
        onClick={onHandleMonth}
      >
        <td>
          {month.number} месяц {month.year}
        </td>
        <td>{Number(month.production.toFixed(2))}</td>
        <td>{Number(month.total_consumed.toFixed(2))}</td>
        <td>{Number(month.ZBC_consumed.toFixed(2))}</td>
        <td>{Number(month.generation.toFixed(2))}</td>
        <td>{Number(month.procentage.toFixed(2))}</td>
        <td>{Number(month.sold.toFixed(2))}</td>
        <td>{Number(month.RUP_consumed.toFixed(2))}</td>
        <td></td>
        <td></td>
        <td>{Number(month.gkal.toFixed(2))}</td>
      </tr>
      {isShowDays &&
        isShow &&
        month.days.map((day) => {
          return <TrDay day={day} key={day.date.getTime()} />;
        })}
    </>
  );
};

export default TrMonth;
