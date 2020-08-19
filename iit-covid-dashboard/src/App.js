import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Table, Container, Row, Col, Carousel, Card, Button, NavDropdown, FormControl } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import logo from './logo.svg';
import './App.css';

const AppNavBar = ({ currentPage, homeClickFunction, dataClickFunction }) =>
  <Navbar bg="light" expand="lg">
    <Navbar.Brand onClick={homeClickFunction}>{"IIT Covid Dashboard - " + currentPage}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={homeClickFunction}>Home</Nav.Link>
        <Nav.Link onClick={dataClickFunction}>Complete Data</Nav.Link>
        <Nav.Link href="https://www.iit.edu/COVID-19">University COVID-19 Page</Nav.Link>
        <NavDropdown title="Extra" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={dataClickFunction}>See the Data</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Source Code</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Contact</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
    };

    this.goHome = this.goHome.bind(this);
    this.goData = this.goData.bind(this);
  }

  goHome() {
    this.setState({ currentPage: "Home" });
  }

  goData() {
    this.setState({ currentPage: "Data" });
  }

  render() {
    if (this.state.currentPage == "Home") {
      return Home(this.goHome, this.goData)
    } else if (this.state.currentPage == "Data") {
      return Data(this.goHome, this.goData)
    }
  }

}

const Home = (homeClickFunction, dataClickFunction) =>
  <div className="Home">
    <AppNavBar
      currentPage="Home"
      homeClickFunction={homeClickFunction}
      dataClickFunction={dataClickFunction}
    />
    <Container>
      <h1>The Unofficial IIT COVID-19 Dashboard</h1>
      <h3>Presented by the smoldering corpse of AEPKS</h3>
      <br />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <StatsCarousel
            currentSlide="Start"
          />
        </Col>
      </Row>
      <hr />
      <br />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Cases by Location</h2>
          <br />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <h5>Institutional Housing</h5>
        </Col>
        <Col md={{ span: 4 }}>
          <h5>Greek Housing</h5>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 100,
            location: "McCormick Student Village",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 100,
            location: "State Street Village",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Phi Kappa Sigma",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Delta Tau Delta",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Kacek Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Gunsalus Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Alpha Sigma Alpha",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Kappa Phi Delta",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 2, offset: 2 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Carmen Hall",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Pi Kappa Phi",
            start_date: "8/24",
            end_date: "9/01"
          })}
          <br />
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
          {CaseNumberBox({
            cases: 27,
            location: "Triangle",
            start_date: "8/24",
            end_date: "9/01"
          })}
        </Col>
      </Row>
    </Container>
  </div>

const Data = (homeClickFunction, dataClickFunction) =>
  <div className="Data">
    <AppNavBar
      currentPage="Data"
      homeClickFunction={homeClickFunction}
      dataClickFunction={dataClickFunction}
    />
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h1>Week by Week Data</h1>
        <br />
        <h2>Overall Statistics</h2>
        <br />
        <hr />
        <h3>Student Population</h3>
        <PopulationDataTable />
        <hr />
        <h3>Faculty Population</h3>
        <DataTable />
        <hr />
        <h3>Institutional Housing Statistics</h3>
        <DataTable />
        <hr />
        <h3>Greek Housing Statistics</h3>
        <DataTable />
        <hr />
      </Col>
    </Row>
  </div>

const PopulationDataTable = () => {
  // Placeholder data.

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Week</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>New Cases</th>
          <th>New Deaths</th>
          <th>Total Cases</th>
          <th>Total Deaths</th>
        </tr>
      </thead>
    </Table>
  )
}


const DataTable = () =>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>


const CarouselStatsItem = ({ value, population, type, date_start, date_end, body_text }) =>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={"http://localhost:8000/number_image/" + value}
      alt={"New" + population + " " + type + " from " + date_start + " to " + date_end}
    />
    <Carousel.Caption>
      <h3>New {population} {type} from {date_start} to {date_end}</h3>
      <p>{body_text}</p>
    </Carousel.Caption>
  </Carousel.Item>


class StatsCarousel extends Component {
  render() {
    return (
      <Carousel>
        {CarouselStatsItem({
          value: "100",
          population: "Student",
          type: "Deaths",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
        {CarouselStatsItem({
          value: "25",
          population: "Faculty",
          type: "Cases",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
        {CarouselStatsItem({
          value: "14",
          population: "Student",
          type: "Cases",
          date_start: "8/24",
          date_end: "9/01",
          body_text: "That's a lot of damage. ~Phil Swift"
        })}
      </Carousel>
    )
  }
}

const CaseNumberBox = ({ cases, location, start_date, end_date }) =>
  <Card style={{ width: '10rem' }}>
    <Card.Body>
      <Card.Title>{cases}</Card.Title>
      <Card.Subtitle>{location}</Card.Subtitle>
      <Card.Text>{"New cases from " + start_date + " to " + end_date}</Card.Text>
    </Card.Body>
  </Card>


export default App;


// Sources:

// Generating images with the info: 
// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas