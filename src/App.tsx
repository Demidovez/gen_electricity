import "./style/bootstrap-reboot.min.css";
import "./style/bootstrap.min.css";
import "./style/style.css";
import TableData from "./components/table";
import Login from "./components/login";
import SaveToExcel from "./components/savetoexcel";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
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
