import { Table } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { COLUMNS, IKvartal, IMonth } from "../types/types";
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
      <div>
        {isLoadingYears ? (
          <Loading />
        ) : (
          <Table
            columns={COLUMNS}
            dataSource={years}
            bordered
            size="middle"
            pagination={false}
          />
        )}
      </div>
    </div>
  );
};

export default TableData;
