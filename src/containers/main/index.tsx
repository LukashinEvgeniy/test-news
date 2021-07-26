import { Badge, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Navigate from "../../components/navbar";
import { isAuthorizedSelector } from "../../redux/selectors";
import { logout } from "../../redux/thunks/auth";
import { AppState } from "../../redux/types/state";

const Main = () => {
  
  return (
    <>
      <Container>
        <Row>
          <Col xs={10} id="page-content-wrapper">
            <h1>
              Самые важные новости <Badge bg="secondary">New</Badge>
            </h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
