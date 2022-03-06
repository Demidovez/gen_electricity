import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { fetchYearAction } from "../redux/actions/creators/yearsActionCreators";
import { IYear } from "../types/types";
import TrKvartal from "./tr_kvartal";

interface IProps {
  year: IYear;
}

const TrYear = ({ year }: IProps) => {
  const dispatch = useAppDispatch();

  const [isShow, setIsShow] = useState(year.isShow);

  const onHandleYear = () => {
    // dispatch(fetchYearAction(year.date));
    setIsShow(!isShow);
  };

  return (
    <>
      <tr className="table-primary" onClick={onHandleYear}>
        <td>{year.date}</td>
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
      {year.kvartals.map((kvartal) => {
        return (
          <TrKvartal
            kvartal={kvartal}
            key={kvartal.number + "_" + kvartal.year}
            isShow={isShow}
          />
        );
      })}
    </>
  );
};

export default TrYear;
