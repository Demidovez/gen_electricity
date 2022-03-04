import "./style/bootstrap-reboot.min.css";
import "./style/bootstrap.min.css";
import "./style/style.css";
import TableData from "./components/table";
import Login from "./components/login";
import SaveToExcel from "./components/savetoexcel";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "./hooks/hooks";
import { useEffect } from "react";
import { fetchDaysAction } from "./redux/actions/creators/daysActionCreators";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDaysAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <SaveToExcel />
          </Col>
          <Col>
            <Login />
          </Col>
        </Row>
      </Container>
      <TableData />
    </div>
  );
};

export default App;
