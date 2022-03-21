import { Popconfirm, Space, Table, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  ITableData,
  IDay,
  IKvartal,
  IMonth,
  IYear,
  MONTHS,
  IData,
} from "../types/types";
import Loading from "./loading";
import React from "react";
import EditableCell from "./editable_cell";
import AddDataLine from "./add_data_line";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getKvartalNumber } from "../utils/utils";
import {
  fetchDaysAction,
  updateDayAction,
} from "../redux/actions/creators/yearsActionCreators";

const TableData = () => {
  const dispatch = useAppDispatch();

  const { yearsRaw, daysRaw, isLoadingYearsRaw } = useAppSelector(
    (state) => state.years
  );

  const [form] = Form.useForm();
  const [years, setYears] = useState<IYear[]>([]);
  const [kvartals, setKvartals] = useState<IKvartal[]>([]);
  const [months, setMonths] = useState<IMonth[]>([]);
  const [days, setDays] = useState<IDay[]>([]);

  const [initExpanded, setInitExpanded] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    if (years.length > 0 && !initExpanded) {
      const lastYear = years[years.length - 1];
      const lastKvartal = lastYear.children?.[lastYear.children?.length - 1];
      const lastMonth =
        lastKvartal?.children?.[lastKvartal?.children?.length - 1];

      setExpandedRowKeys([
        lastYear.key,
        lastKvartal?.key || "",
        lastMonth?.key || "",
      ]);
      setInitExpanded(true);
    }
  }, [years, initExpanded]);

  useEffect(() => setDays(daysRaw), [daysRaw]);

  useEffect(() => {
    if (days.length > 0) {
      let monthsList: IMonth[] = [];

      days.forEach((day) => {
        const year = new Date(day.date).getFullYear();
        const month = new Date(day.date).getMonth() + 1;

        const monthIndex = monthsList.findIndex(
          (item) => item.month === month && item.year === year
        );

        if (monthIndex > -1) {
          const monthFound = monthsList[monthIndex];

          monthsList[monthIndex] = {
            ...monthFound,
            production: monthFound.production + day.production,
            total_consumed: monthFound.total_consumed + day.total_consumed,
            ZBC_consumed: monthFound.ZBC_consumed + day.ZBC_consumed,
            generation: monthFound.generation + day.generation,
            procentage: monthFound.procentage + day.procentage,
            sold: monthFound.sold + day.sold,
            RUP_consumed: monthFound.RUP_consumed + day.RUP_consumed,
            power: monthFound.power + day.power,
            gkal: monthFound.gkal + day.gkal,
            children: [...monthFound.children, day],
          };
        } else {
          monthsList.push({
            key: `year_${year}.kvartal_${getKvartalNumber(
              month
            )}.month_${month}`,
            month: month,
            year: year,
            shortdate: MONTHS[month - 1],
            date: day.date,
            production: day.production,
            total_consumed: day.total_consumed,
            ZBC_consumed: day.ZBC_consumed,
            generation: day.generation,
            procentage: day.procentage,
            sold: day.sold,
            RUP_consumed: day.RUP_consumed,
            power: day.power,
            plus: day.plus,
            gkal: day.gkal,
            index: monthsList.length,
            children: [day],
          });
        }
      });

      setMonths(monthsList);
    }
  }, [days]);

  useEffect(() => {
    if (months.length > 0) {
      let kvartalsList: IKvartal[] = [];

      months.forEach((month) => {
        const kvartal = getKvartalNumber(month.month);

        const kvartalIndex = kvartalsList.findIndex(
          (item) => item.year === month.year && item.kvartal === kvartal
        );

        if (kvartalIndex > -1) {
          const kvartalFound = kvartalsList[kvartalIndex];

          kvartalsList[kvartalIndex] = {
            ...kvartalFound,
            production: kvartalFound.production + month.production,
            total_consumed: kvartalFound.total_consumed + month.total_consumed,
            ZBC_consumed: kvartalFound.ZBC_consumed + month.ZBC_consumed,
            generation: kvartalFound.generation + month.generation,
            procentage: kvartalFound.procentage + month.procentage,
            sold: kvartalFound.sold + month.sold,
            RUP_consumed: kvartalFound.RUP_consumed + month.RUP_consumed,
            power: kvartalFound.power + month.power,
            gkal: kvartalFound.gkal + month.gkal,
            children: [...kvartalFound.children, month],
          };
        } else {
          kvartalsList.push({
            key: `year_${month.year}.kvartal_${kvartal}`,
            kvartal: kvartal,
            year: month.year,
            shortdate: `${kvartal} квартал`,
            date: month.date,
            production: month.production,
            total_consumed: month.total_consumed,
            ZBC_consumed: month.ZBC_consumed,
            generation: month.generation,
            procentage: month.procentage,
            sold: month.sold,
            RUP_consumed: month.RUP_consumed,
            power: month.power,
            plus: false,
            gkal: month.gkal,
            index: kvartalsList.length,
            children: [month],
          });
        }
      });

      setKvartals(kvartalsList);
    }
  }, [months]);

  useEffect(() => {
    if (kvartals.length > 0 && yearsRaw.length > 0) {
      let yearsList: IYear[] = [];

      kvartals.forEach((kvartal) => {
        const yearIndex = yearsList.findIndex(
          (item) => item.year === kvartal.year
        );

        if (yearIndex > -1) {
          const yearFound = yearsList[yearIndex];

          yearsList[yearIndex] = {
            ...yearFound,
            production: yearFound.production + kvartal.production,
            total_consumed: yearFound.total_consumed + kvartal.total_consumed,
            ZBC_consumed: yearFound.ZBC_consumed + kvartal.ZBC_consumed,
            generation: yearFound.generation + kvartal.generation,
            procentage: yearFound.procentage + kvartal.procentage,
            sold: yearFound.sold + kvartal.sold,
            RUP_consumed: yearFound.RUP_consumed + kvartal.RUP_consumed,
            power: yearFound.power + kvartal.power,
            gkal: yearFound.gkal + kvartal.gkal,
            children: [...yearFound.children, kvartal],
          };
        } else {
          yearsList.push({
            key: `year_${kvartal.year}`,
            year: kvartal.year,
            shortdate: kvartal.year.toString(),
            date: kvartal.year.toString(),
            production: kvartal.production,
            total_consumed: kvartal.total_consumed,
            ZBC_consumed: kvartal.ZBC_consumed,
            generation: kvartal.generation,
            procentage: kvartal.procentage,
            sold: kvartal.sold,
            RUP_consumed: kvartal.RUP_consumed,
            power: kvartal.power,
            plus: false,
            gkal: kvartal.gkal,
            index: yearsList.length,
            children: [kvartal],
          });
        }
      });

      yearsRaw.forEach((yearRaw) => {
        if (!yearsList.some((year) => year.year === yearRaw.year)) {
          yearsList.push({
            ...yearRaw,
            key: `year_${yearRaw.year}`,
            shortdate: yearRaw.year.toString(),
            plus: false,
            index: yearsList.length,
            children: [],
          });
        }
      });

      setYears(
        yearsList
          .sort((a, b) => a.year - b.year)
          .map((year, index) => ({ ...year, index }))
      );
    }
  }, [kvartals, yearsRaw]);

  const isEditing = useCallback(
    (record: ITableData) => record.key === editingKey,
    [editingKey]
  );

  const edit = useCallback(
    (record: Partial<ITableData> & { key: React.Key }) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.key);
    },
    [form]
  );

  const cancel = useCallback(() => setEditingKey(""), []);

  const updateData = useCallback(
    (day: IDay, indexDay: number) => {
      const year = new Date(day.date).getFullYear();
      const month = new Date(day.date).getMonth() + 1;
      const kvartal = getKvartalNumber(month);

      const newDays = [...days];
      const newMonths = [...months];
      const newKvartals = [...kvartals];
      const newYears = [...years];

      const oldDay = newDays[indexDay];
      const oldMonth = newMonths.find(
        (oldMonth) => oldMonth.month === month && oldMonth.year === year
      );
      const oldKvartal = newKvartals.find(
        (oldKvartal) =>
          oldKvartal.kvartal === kvartal && oldKvartal.year === year
      );
      const oldYear = newYears.find((oldYear) => oldYear.year === year);

      if (oldMonth && oldKvartal && oldYear) {
        const newMonth = {
          ...oldMonth,
          production: oldMonth.production - oldDay.production + day.production,
          total_consumed:
            oldMonth.total_consumed -
            oldDay.total_consumed +
            day.total_consumed,
          ZBC_consumed:
            oldMonth.ZBC_consumed - oldDay.ZBC_consumed + day.ZBC_consumed,
          generation: oldMonth.generation - oldDay.generation + day.generation,
          procentage: oldMonth.procentage - oldDay.procentage + day.procentage,
          sold: oldMonth.sold - oldDay.sold + day.sold,
          RUP_consumed:
            oldMonth.RUP_consumed - oldDay.RUP_consumed + day.RUP_consumed,
          power: oldMonth.power - oldDay.power + day.power,
          plus: day.plus,
          gkal: oldMonth.gkal - oldDay.gkal + day.gkal,
          children: oldMonth.children.map((oldDay) => {
            if ((oldDay as IDay).date === day.date) {
              return day;
            } else {
              return oldDay;
            }
          }),
        };

        const newKvartal = {
          ...oldKvartal,
          production:
            oldKvartal.production - oldMonth.production + newMonth.production,
          total_consumed:
            oldKvartal.total_consumed -
            oldMonth.total_consumed +
            newMonth.total_consumed,
          ZBC_consumed:
            oldKvartal.ZBC_consumed -
            oldMonth.ZBC_consumed +
            newMonth.ZBC_consumed,
          generation:
            oldKvartal.generation - oldMonth.generation + newMonth.generation,
          procentage:
            oldKvartal.procentage - oldMonth.procentage + newMonth.procentage,
          sold: oldKvartal.sold - oldMonth.sold + newMonth.sold,
          RUP_consumed:
            oldKvartal.RUP_consumed -
            oldMonth.RUP_consumed +
            newMonth.RUP_consumed,
          power: oldKvartal.power - oldMonth.power + newMonth.power,
          gkal: oldKvartal.gkal - oldMonth.gkal + newMonth.gkal,
          children: oldKvartal.children.map((oldMonth) => {
            if ((oldMonth as IMonth).month === newMonth.month) {
              return newMonth;
            } else {
              return oldMonth;
            }
          }),
        };

        const newYear = {
          ...oldYear,
          production:
            oldYear.production - oldKvartal.production + newKvartal.production,
          total_consumed:
            oldYear.total_consumed -
            oldKvartal.total_consumed +
            newKvartal.total_consumed,
          ZBC_consumed:
            oldYear.ZBC_consumed -
            oldKvartal.ZBC_consumed +
            newKvartal.ZBC_consumed,
          generation:
            oldYear.generation - oldKvartal.generation + newKvartal.generation,
          procentage:
            oldYear.procentage - oldKvartal.procentage + newKvartal.procentage,
          sold: oldYear.sold - oldKvartal.sold + newKvartal.sold,
          RUP_consumed:
            oldYear.RUP_consumed -
            oldKvartal.RUP_consumed +
            newKvartal.RUP_consumed,
          power: oldYear.power - oldKvartal.power + newKvartal.power,
          gkal: oldYear.gkal - oldKvartal.gkal + newKvartal.gkal,
          children: oldYear.children.map((oldKvartal) => {
            if ((oldKvartal as IKvartal).kvartal === newKvartal.kvartal) {
              return newKvartal;
            } else {
              return oldKvartal;
            }
          }),
        };

        newMonths.splice(oldMonth.index, 1, newMonth);
        newKvartals.splice(oldKvartal.index, 1, newKvartal);
        newYears.splice(oldYear.index, 1, newYear);
      }

      newDays.splice(indexDay, 1, {
        ...oldDay,
        ...day,
      });

      setDays(newDays);
      setMonths(newMonths);
      setKvartals(newKvartals);
      setYears(newYears);
    },
    [days, months, kvartals, years]
  );

  const addData = useCallback(
    (day: IDay) => {
      setDays([...days, day]);
    },
    [days]
  );

  const save = useCallback(
    async (key: React.Key) => {
      try {
        const dayTable = (await form.validateFields()) as IDay;

        setEditingKey("");

        const index = days.findIndex((item) => key === item.key);
        const newDay = {
          ...days[index],
          ...dayTable,
        };

        if (index > -1) {
          updateData(newDay, index);
          dispatch(updateDayAction(newDay));
        } else {
          addData(newDay);
        }
      } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
      }
    },
    [form, days, updateData, addData]
  );

  const columns = useMemo(
    () => [
      {
        title: "Дата/Месяц/Год",
        dataIndex: "shortdate",
        key: "date",
        width: "12%",
        editable: true,
      },
      {
        title: "Выработка целлюлозы, тонн.",
        dataIndex: "production",
        key: "production",
        width: "9%",
        editable: true,
      },
      {
        title: "Прямое потребление",
        editable: true,
        children: [
          {
            title: "Всего, тыс. кВтч",
            dataIndex: "total_consumed",
            key: "total_consumed",
            editable: true,
            width: "9%",
          },
          {
            title: "в том числе ЗБЦ, тыс. кВтч",
            dataIndex: "ZBC_consumed",
            key: "ZBC_consumed",
            editable: true,
            width: "9%",
          },
        ],
      },
      {
        title: "Выработка электроэнергии, тыс. кВтч",
        dataIndex: "generation",
        key: "generation",
        width: "9%",
        editable: true,
      },
      {
        title: "% от общего потребления",
        dataIndex: "procentage",
        key: "procentage",
        width: "9%",
        editable: false,
      },
      {
        title: "Продано, тыс. кВтч",
        dataIndex: "sold",
        key: "sold",
        editable: true,
        width: "9%",
      },
      {
        title: 'Потреблено от РУП "Гомельэнерго"',
        editable: true,
        children: [
          {
            title: "тыс. кВтч",
            dataIndex: "RUP_consumed",
            key: "RUP_consumed",
            width: "9%",
            editable: true,
          },
          {
            title: "Мощность, МВт",
            dataIndex: "power",
            key: "power",
            colSpan: 2,
            editable: true,
            width: "9%",
          },
          {
            title: "",
            dataIndex: "plus",
            key: "plus",
            colSpan: 0,
            editable: true,
            width: "5%",
          },
          {
            title: "Гкал",
            dataIndex: "gkal",
            key: "gkal",
            width: "9%",
            editable: true,
          },
        ],
      },
      {
        title: "",
        dataIndex: "operation",
        key: "operation",
        className: "operation_column",
        editable: false,
        render: (_: any, record: ITableData) => {
          const editable = isEditing(record);

          if (!record.key.includes("day_")) return null;

          return (
            <div>
              {editable ? (
                <Space size="small">
                  <Typography.Link onClick={() => save(record.key)}>
                    <SaveOutlined
                      style={{ fontSize: "20px", verticalAlign: "middle" }}
                    />
                  </Typography.Link>
                  <Popconfirm
                    title="Вы уверены?"
                    onConfirm={cancel}
                    okText="Да"
                    cancelText="Отмена"
                  >
                    <CloseCircleOutlined
                      style={{
                        fontSize: "20px",
                        color: "#c0392b",
                        verticalAlign: "middle",
                      }}
                    />
                  </Popconfirm>
                </Space>
              ) : (
                editingKey === "" && (
                  <Space size="small">
                    <Typography.Link onClick={() => edit(record)}>
                      <EditOutlined
                        style={{
                          fontSize: "20px",
                          verticalAlign: "middle",
                          color: "#343a40",
                        }}
                      />
                    </Typography.Link>

                    <Popconfirm
                      title="Вы уверены?"
                      onConfirm={cancel}
                      okText="Да"
                      cancelText="Отмена"
                    >
                      <DeleteOutlined
                        style={{
                          fontSize: "20px",
                          color: "#c0392b",
                          verticalAlign: "middle",
                        }}
                      />
                    </Popconfirm>
                  </Space>
                )
              )}
            </div>
          );
        },
      },
    ],
    [isEditing, save, cancel, editingKey, edit]
  );

  const mapColumnsOfTable = useCallback(
    (col: any) => {
      if (!col.editable) {
        return col;
      }

      const newCol = {
        ...col,
        onCell: (record: ITableData) => ({
          record,
          inputType: col.dataIndex === "shortdate" ? "date" : "number",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };

      if (col.children) {
        newCol.children = col.children.map(mapColumnsOfTable);
      }

      return newCol;
    },
    [isEditing]
  );

  const columnsList = useMemo(
    () => columns.map(mapColumnsOfTable),
    [columns, mapColumnsOfTable]
  );

  const onTableRowExpand = useCallback(
    (expanded: boolean, record: ITableData) => {
      if (expanded) {
        setExpandedRowKeys([...expandedRowKeys, record.key]);
      } else {
        setExpandedRowKeys(
          expandedRowKeys.filter((key) => key.indexOf(record.key) === -1)
        );
      }

      const year = years.find((year) => year.year === (record as IData).year);
      if (year?.children.length === 0) {
        dispatch(fetchDaysAction((record as IData).year));
      }
    },
    [expandedRowKeys, years, dispatch]
  );

  const components = useMemo(
    () => ({
      body: {
        cell: EditableCell,
      },
    }),
    []
  );

  const expandable = useMemo(
    () => ({
      expandRowByClick: true,
      expandIcon: () => <></>,
      expandedRowKeys: expandedRowKeys,
    }),
    [expandedRowKeys]
  );

  const addline = useCallback(() => <AddDataLine />, []);

  return (
    <div className="table_days">
      {isLoadingYearsRaw ? (
        <Loading />
      ) : (
        <Form form={form} component={false}>
          <Table
            columns={columnsList}
            rowClassName="editable-row"
            components={components}
            dataSource={years}
            bordered
            size="small"
            pagination={false}
            indentSize={0}
            expandable={expandable}
            summary={addline}
            onExpand={onTableRowExpand}
          />
        </Form>
      )}
    </div>
  );
};

export default React.memo(TableData);
