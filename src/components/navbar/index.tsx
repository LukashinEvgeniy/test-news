import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { routes } from "../../config/constants";
import history from "../../history";
type NavProps = {
  isAuth: boolean
  newsCategory: any[]
  logout: () => void
}
const Navigate = (props: NavProps) => {
  const handleSelect = (eventKey: string | null) =>
  eventKey ? history.push(eventKey) : null;
  

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Самые важные новости</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav onSelect={handleSelect} className="me-auto">
              <Nav.Link eventKey={routes.main}>Home</Nav.Link>
              {props.isAuth &&
              <NavDropdown title="News" id="collasible-nav-dropdown">
                {props.newsCategory.map(item => (<NavDropdown.Item key={item} eventKey={`${routes.news}/item`}>Спорт</NavDropdown.Item>))}
              </NavDropdown>
              }
            </Nav>
            <Nav>
            {props.isAuth 
            ? (<Nav.Link onSelect={props.logout}>Logout</Nav.Link>) 
            : (<Nav.Link onSelect={handleSelect} eventKey={routes.auth}>Login</Nav.Link>)
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigate;
