import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { IDay, IKvartal, IMonth, IYear, MONTHS, IData } from "../types/types";
import Loading from "./loading";
import React from "react";
import AddDataLine from "./add_data_line";
import { getKvartalNumber, summa } from "../utils/utils";
import {
  deleteDayAction,
  fetchDaysAction,
  setEditiongAction,
  setExpandedRowAction,
  setExpandedRowsAction,
  updateDayAction,
} from "../redux/actions/creators/yearsActionCreators";
import DataLine from "./data_line";

const TableData = () => {
  const dispatch = useAppDispatch();

  const { yearsRaw, daysRaw, isLoadingYearsRaw, expandedRows, editedKey } =
    useAppSelector((state) => state.years);

  const [years, setYears] = useState<IData[] | null>(null);
  const [kvartals, setKvartals] = useState<IKvartal[]>([]);
  const [months, setMonths] = useState<IMonth[]>([]);
  const [days, setDays] = useState<IDay[]>([]);

  const [initExpanded, setInitExpanded] = useState(false);

  // Определяем какие строки должны быть открыты (последний год, последний квартал, последний месяц)
  useEffect(() => {
    if (years && years.length > 0 && !initExpanded) {
      const lastYear = years[years.length - 1];
      const lastKvartal = lastYear.children?.[lastYear.children?.length - 1];
      const lastMonth =
        lastKvartal?.children?.[lastKvartal?.children?.length - 1];

      dispatch(
        setExpandedRowsAction([
          lastYear.key,
          lastKvartal?.key || "",
          lastMonth?.key || "",
        ])
      );
      setInitExpanded(true);
    }
  }, [dispatch, years, initExpanded]);

  // Обновляем список дней
  useEffect(() => setDays(daysRaw), [daysRaw]);

  // Обновляем список месяцев
  useEffect(() => {
    if (days.length > 0) {
      let monthsList: IMonth[] = [];

      days.forEach((day) => {
        const year = new Date(day.date).getFullYear();
        const month = new Date(day.date).getMonth() + 1;

        const monthIndex = monthsList.findIndex(
          (item) => item.month === month && item.year === year
        );

        // Если месяц уже есть до добавляем к нему данные за день
        if (monthIndex > -1) {
          const monthFound = monthsList[monthIndex];

          monthsList[monthIndex] = {
            ...monthFound,
            production: summa(monthFound.production, day.production),
            total_consumed: summa(
              monthFound.total_consumed,
              day.total_consumed
            ),
            ZBC_consumed: summa(monthFound.ZBC_consumed, day.ZBC_consumed),
            generation: summa(monthFound.generation, day.generation),
            procentage: Number(
              Number(
                ((monthFound.generation + day.generation) /
                  (monthFound.total_consumed + day.total_consumed)) *
                  100
              ).toFixed(2)
            ), //monthFound.procentage + day.procentage,
            sold: summa(monthFound.sold, day.sold),
            RUP_consumed: summa(monthFound.RUP_consumed, day.RUP_consumed),
            power: null,
            gkal: summa(monthFound.gkal, day.gkal),
            children: [...monthFound.children, day],
          };
        } else {
          // Если нету - добавляем первый день
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
            procentage: Number(
              Number((day.generation / day.total_consumed) * 100).toFixed(2)
            ),
            sold: day.sold,
            RUP_consumed: day.RUP_consumed,
            power: null,
            plus: false,
            gkal: day.gkal,
            index: monthsList.length,
            children: [day],
          });
        }
      });

      setMonths(
        monthsList.map((month) => ({
          ...month,
          power: +parseFloat(
            "" +
              month.children.reduce((a, b) => a + (b.power || 0), 0) /
                month.children.length
          ).toFixed(2),
          plus:
            month.children.reduce((a, b) => a + +b.plus, 0) >=
            month.children.length / 2,
          children: month.children.sort(
            (a, b) =>
              new Date((a as IDay).date).getTime() -
              new Date((b as IDay).date).getTime()
          ),
        }))
      );
    }
  }, [days]);

  // Обновляем список кварталов
  useEffect(() => {
    if (months.length > 0) {
      let kvartalsList: IKvartal[] = [];

      months.forEach((month) => {
        const kvartal = getKvartalNumber(month.month);

        const kvartalIndex = kvartalsList.findIndex(
          (item) => item.year === month.year && item.kvartal === kvartal
        );

        // Если квартал уже есть до добавляем к нему данные за месяц
        if (kvartalIndex > -1) {
          const kvartalFound = kvartalsList[kvartalIndex];

          kvartalsList[kvartalIndex] = {
            ...kvartalFound,
            production: summa(kvartalFound.production, month.production),
            total_consumed: summa(
              kvartalFound.total_consumed,
              month.total_consumed
            ),
            ZBC_consumed: summa(kvartalFound.ZBC_consumed, month.ZBC_consumed),
            generation: summa(kvartalFound.generation, month.generation),
            procentage: Number(
              Number(
                ((kvartalFound.generation + month.generation) /
                  (kvartalFound.total_consumed + month.total_consumed)) *
                  100
              ).toFixed(2)
            ),
            sold: summa(kvartalFound.sold, month.sold),
            RUP_consumed: summa(kvartalFound.RUP_consumed, month.RUP_consumed),
            power: null,
            gkal: summa(kvartalFound.gkal, month.gkal),
            children: [...kvartalFound.children, month],
          };
        } else {
          // Если нету - добавляем первый месяц
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
            procentage: Number(
              Number((month.generation / month.total_consumed) * 100).toFixed(2)
            ),
            sold: month.sold,
            RUP_consumed: month.RUP_consumed,
            power: null,
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

  // Обновляем список лет
  useEffect(() => {
    if (kvartals.length > 0 && yearsRaw.length > 0) {
      let yearsList: IYear[] = [];

      kvartals.forEach((kvartal) => {
        const yearIndex = yearsList.findIndex(
          (item) => item.year === kvartal.year
        );

        // Если год уже есть до добавляем к нему данные за квартал
        if (yearIndex > -1) {
          const yearFound = yearsList[yearIndex];

          yearsList[yearIndex] = {
            ...yearFound,
            production: summa(yearFound.production, kvartal.production),
            total_consumed: summa(
              yearFound.total_consumed,
              kvartal.total_consumed
            ),
            ZBC_consumed: summa(yearFound.ZBC_consumed, kvartal.ZBC_consumed),
            generation: summa(yearFound.generation, kvartal.generation),
            procentage: Number(
              Number(
                ((yearFound.generation + kvartal.generation) /
                  (yearFound.total_consumed + kvartal.total_consumed)) *
                  100
              ).toFixed(2)
            ),
            sold: summa(yearFound.sold, kvartal.sold),
            RUP_consumed: summa(yearFound.RUP_consumed, kvartal.RUP_consumed),
            power: null,
            gkal: summa(yearFound.gkal, kvartal.gkal),
            children: [...yearFound.children, kvartal],
          };
        } else {
          // Если нету - добавляем первый квартал
          yearsList.push({
            key: `year_${kvartal.year}`,
            year: kvartal.year,
            shortdate: kvartal.year.toString(),
            date: kvartal.year.toString(),
            production: kvartal.production,
            total_consumed: kvartal.total_consumed,
            ZBC_consumed: kvartal.ZBC_consumed,
            generation: kvartal.generation,
            procentage: Number(
              Number(
                (kvartal.generation / kvartal.total_consumed) * 100
              ).toFixed(2)
            ),
            sold: kvartal.sold,
            RUP_consumed: kvartal.RUP_consumed,
            power: null,
            plus: false,
            gkal: kvartal.gkal,
            index: yearsList.length,
            children: [kvartal],
          });
        }
      });

      // Добавляем к списку оставшиеся загружанные года
      yearsRaw.forEach((yearRaw) => {
        if (!yearsList.some((year) => year.year === yearRaw.year)) {
          yearsList.push({
            ...yearRaw,
            key: `year_${yearRaw.year}`,
            shortdate: yearRaw.year.toString(),
            plus: false,
            procentage: Number(
              Number(
                (yearRaw.generation / yearRaw.total_consumed) * 100
              ).toFixed(2)
            ),
            power: null,
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

  // Конфигурация колонок
  const columns = useMemo(
    () => [
      {
        title: "Дата/Месяц/Год",
        dataIndex: "shortdate",
        key: "date",
        width: "12%",
      },
      {
        title: "Выработка целлюлозы, тонн.",
        dataIndex: "production",
        key: "production",
        width: "9%",
      },
      {
        title: "Прямое потребление",
        children: [
          {
            title: "Всего, тыс. кВтч",
            dataIndex: "total_consumed",
            key: "total_consumed",
            width: "9%",
          },
          {
            title: "в том числе ЗБЦ, тыс. кВтч",
            dataIndex: "ZBC_consumed",
            key: "ZBC_consumed",
            width: "9%",
          },
        ],
      },
      {
        title: "Выработка электроэнергии, тыс. кВтч",
        dataIndex: "generation",
        key: "generation",
        width: "9%",
      },
      {
        title: "% от общего потребления",
        dataIndex: "procentage",
        key: "procentage",
        width: "9%",
      },
      {
        title: "Продано, тыс. кВтч",
        dataIndex: "sold",
        key: "sold",
        width: "9%",
      },
      {
        title: 'Потреблено от РУП "Гомельэнерго"',
        children: [
          {
            title: "тыс. кВтч",
            dataIndex: "RUP_consumed",
            key: "RUP_consumed",
            width: "9%",
          },
          {
            title: "Мощность, МВт",
            dataIndex: "power",
            key: "power",
            colSpan: 2,
            width: "9%",
          },
          {
            title: "",
            dataIndex: "plus",
            key: "plus",
            colSpan: 0,
            width: "5%",
          },
          {
            title: "Гкал",
            dataIndex: "gkal",
            key: "gkal",
            width: "9%",
          },
        ],
      },
      {
        title: "",
        dataIndex: "operation",
        key: "operation",
        className: "operation_column",
      },
    ],
    []
  );

  // Обрабатываем разворачивание/сворачивание строк
  const onExpand = useCallback(
    (key: string, clickedYear: number) => {
      dispatch(setExpandedRowAction(key));

      const year = years?.find((year) => year.year === clickedYear);

      if (year?.children.length === 0) {
        dispatch(fetchDaysAction(clickedYear));
      }
    },
    [years, dispatch]
  );

  const components = useMemo(
    () => ({
      body: {
        row: DataLine,
      },
    }),
    []
  );

  const expandable = useMemo(
    () => ({
      expandRowByClick: true,
      expandIcon: () => <></>,
      expandedRowKeys: expandedRows,
    }),
    [expandedRows]
  );

  const addline = useCallback(() => <AddDataLine />, []);

  const onEdit = useCallback(
    (key: string) => dispatch(setEditiongAction(key)),
    [dispatch]
  );

  const onCancel = useCallback(
    () => dispatch(setEditiongAction("")),
    [dispatch]
  );

  const onUpdate = useCallback(
    (key: string, day: IData) => {
      const newDays = days.map((item) => {
        if (key === item.key) {
          return {
            ...item,
            ...day,
          };
        } else {
          return item;
        }
      });

      setDays(newDays);

      dispatch(updateDayAction(day));
    },
    [days, dispatch]
  );

  const onRemove = useCallback(
    (key: string) => {
      const date = days.find((day) => day.key === key)?.date;

      date && dispatch(deleteDayAction(date));

      setDays(days.filter((day) => day.key !== key));
    },
    [days]
  );

  const onRow = useCallback(
    (record: IData) => ({
      ...record,
      isEditedKey: record.key === editedKey,
      onEdit: () => onEdit(record.key),
      onCancel,
      onUpdate,
      onRemove: () => onRemove(record.key),
      onExpand: () => onExpand(record.key, record.year),
    }),
    [editedKey, onEdit, onCancel, onUpdate, onRemove, onExpand]
  );

  return (
    <div className="table_days">
      {isLoadingYearsRaw || !years ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          rowClassName="editable-row"
          components={components}
          dataSource={years}
          bordered
          size="small"
          pagination={false}
          indentSize={0}
          expandable={expandable}
          summary={addline}
          onRow={onRow}
        />
      )}
    </div>
  );
};

export default React.memo(TableData);
