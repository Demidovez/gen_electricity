import "antd/dist/antd.css";
import "./style/style.css";
import TableData from "./components/table";
import UserLine from "./components/user_line";
import SaveToExcel from "./components/save_to_excel";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import {
  fetchDaysAction,
  fetchYearsAction,
} from "./redux/actions/creators/yearsActionCreators";
import { Col, Row } from "antd";
import Login from "./components/login";
import { getLoginedUserAction } from "./redux/actions/creators/userActionCreators";

const App = () => {
  const dispatch = useAppDispatch();

  const { isLogined, isUnknownUser } = useAppSelector((state) => state.user);

  const isLoadingYears = useAppSelector(
    (state) => state.years.isLoadingYearsRaw
  );

  useEffect(() => {
    if (isLogined) {
      dispatch(fetchYearsAction());
      dispatch(fetchDaysAction());
    } else {
      dispatch(getLoginedUserAction());
    }
  }, [dispatch, isLogined]);

  return (
    <div className="App">
      {isLogined ? (
        <>
          <Row justify="space-between">
            <Col flex="auto">
              <SaveToExcel isDisable={isLoadingYears} />
            </Col>
            <Col>
              <UserLine />
            </Col>
          </Row>
          <TableData />
        </>
      ) : (
        isUnknownUser && <Login />
      )}
    </div>
  );
};

export default App;
